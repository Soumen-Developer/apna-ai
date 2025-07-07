import React, { useState } from 'react';
import Button from '../components/Button';
import { useGenerateTextMutation } from '../services/geminiApi';
import { File as FileIcon, Download, Zap } from 'lucide-react';

const DocumentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [documentType, setDocumentType] = useState<'pdf' | 'docx' | 'txt'>('pdf');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [generateDocument, { isLoading: loading }] = useGenerateTextMutation();

  const handleGenerateDocument = async () => {
    if (!prompt.trim()) return;

    try {
      // This is a mock API call. In a real application, this would
      // call a backend service that generates a document and returns a URL.
      // We are using generateText as a placeholder.
      const response = await generateDocument({
        prompt: `Generate a ${documentType} document about: ${prompt}`,
      }).unwrap();
      
      // In a real app, you'd get a URL. For this mock, we'll create a blob.
      const blob = new Blob([response.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);

    } catch (error) {
      console.error('Document generation failed:', error);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      window.open(resultUrl, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <FileIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Generator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm transition-colors duration-300">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Document Type</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as 'pdf' | 'docx' | 'txt')}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 transition-all duration-300"
              >
                <option value="pdf">PDF Document</option>
                <option value="docx">Word Document</option>
                <option value="txt">Text File</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the document you want to generate..."
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-48 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
              />
              <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-right">
                {prompt.length}/2000 characters
              </div>
            </div>

            <Button
              onClick={handleGenerateDocument}
              disabled={loading || !prompt.trim()}
              className="w-full py-4 mt-2 text-lg flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Generate Document</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FileIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generated Document</h2>
            </div>
            {resultUrl && (
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-xl transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>

          <div className="h-96">
            {resultUrl ? (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700/50 transition-colors duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                    <FileIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Document Ready</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {documentType.toUpperCase()} • {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click the download button above to save your generated document. The document will be generated in the selected format with AI-powered content based on your prompt.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center transition-colors duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mb-4">
                  <FileIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">Document will appear here</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-sm">
                  {loading ? 'Generating document...' : 'Enter a prompt and click generate'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentGenerator;
