import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const geminiApi = createApi({
  reducerPath: 'geminiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  }),
  endpoints: (builder) => ({
    generateText: builder.mutation({
      query: ({ prompt, temperature = 0.7, maxTokens = 1000 }) => ({
        url: `/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        method: 'POST',
        body: {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
          }
        },
      }),
      transformResponse: (response: { candidates: { content: { parts: { text: string }[] } }[], usageMetadata: { promptTokenCount: number, candidatesTokenCount: number, totalTokenCount: number } }) => {
        const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error("Gemini API returned a successful response but with no content.");
        }
        return {
          text,
          usage: {
            promptTokens: response.usageMetadata?.promptTokenCount ?? 0,
            completionTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
            totalTokens: response.usageMetadata?.totalTokenCount ?? 0,
          }
        };
      }
    }),
  }),
});

export const { useGenerateTextMutation } = geminiApi;
