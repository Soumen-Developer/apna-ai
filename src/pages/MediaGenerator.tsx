import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useGenerateTextMutation } from '../services/geminiApi';

const MediaGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [result, setResult] = useState<string | null>(null);
  const [generateMedia, { isLoading: loading }] = useGenerateTextMutation();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const mediaPrompt = `Generate a ${mediaType} based on this prompt: ${prompt}. Return only the URL to the media.`;

    try {
      const response = await generateMedia({
        prompt: mediaPrompt,
        temperature: 0.5,
        maxTokens: 1000,
      }).unwrap();
      
      // In a real scenario, you would want to validate if the response.text is a valid URL
      setResult(response.text);
    } catch (error) {
      console.error('Generation error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Media Generation</h1>
      
      <div className="mb-4">
        <label className="block mb-2 font-medium">Media Type</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setMediaType('image')}
            className={`px-4 py-2 rounded-lg ${mediaType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            Image
          </button>
          <button
            onClick={() => setMediaType('video')}
            className={`px-4 py-2 rounded-lg ${mediaType === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            Video
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Prompt</label>
        <Input
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPrompt(e.target.value)}
          placeholder="Describe what you want to generate..."
          className="w-full h-32 p-3"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full py-3 text-lg"
      >
        {loading ? 'Generating...' : 'Generate'}
      </Button>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          {mediaType === 'image' ? (
            <img src={result} alt="Generated" className="max-w-full h-auto rounded-lg shadow-md" />
          ) : (
            <video src={result} controls className="w-full h-64 rounded-lg shadow-md" />
          )}
        </div>
      )}
    </div>
  );
};

export default MediaGenerator;
