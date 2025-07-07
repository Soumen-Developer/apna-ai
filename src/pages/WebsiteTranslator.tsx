import React, { useState } from 'react';
import { Globe, Link as LinkIcon, Languages, Scan, Download, Copy, Save, ArrowRight, CheckCircle, AlertCircle, Sparkles, Code, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DetectedLanguage {
  code: string;
  name: string;
  confidence: number;
}

interface TranslationProject {
  id: string;
  originalUrl: string;
  sourceLanguage: DetectedLanguage;
  targetLanguage: { code: string; name: string };
  status: 'analyzing' | 'translating' | 'completed' | 'error';
  progress: number;
  generatedCode?: string;
}

const WebsiteTranslator = () => {
  const [inputType, setInputType] = useState<'url' | 'code'>('url');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteCode, setWebsiteCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState<DetectedLanguage | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentProject, setCurrentProject] = useState<TranslationProject | null>(null);
  const navigate = useNavigate();

  const supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
    { code: 'da', name: 'Danish', flag: '🇩🇰' },
    { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
    { code: 'fi', name: 'Finnish', flag: '🇫🇮' }
  ];

  const quickExamples = [
    { url: 'https://example-spanish-site.com', description: 'Spanish E-commerce Site' },
    { url: 'https://example-french-blog.fr', description: 'French Tech Blog' },
    { url: 'https://example-german-news.de', description: 'German News Portal' },
    { url: 'https://example-japanese-site.jp', description: 'Japanese Corporate Site' }
  ];

  const handleAnalyzeWebsite = async () => {
    if (inputType === 'url' && !websiteUrl.trim()) return;
    if (inputType === 'code' && !websiteCode.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate language detection
    setTimeout(() => {
      const mockDetectedLanguages = [
        { code: 'es', name: 'Spanish', confidence: 0.95 },
        { code: 'fr', name: 'French', confidence: 0.88 },
        { code: 'de', name: 'German', confidence: 0.92 },
        { code: 'ja', name: 'Japanese', confidence: 0.87 }
      ];
      
      const detected = mockDetectedLanguages[Math.floor(Math.random() * mockDetectedLanguages.length)];
      setDetectedLanguage(detected);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleStartTranslation = async () => {
    if (!detectedLanguage || !targetLanguage) return;

    const selectedTargetLang = supportedLanguages.find(lang => lang.code === targetLanguage);
    if (!selectedTargetLang) return;

    const project: TranslationProject = {
      id: Date.now().toString(),
      originalUrl: inputType === 'url' ? websiteUrl : 'Custom Code',
      sourceLanguage: detectedLanguage,
      targetLanguage: selectedTargetLang,
      status: 'analyzing',
      progress: 0
    };

    setCurrentProject(project);

    // Simulate translation process
    const progressSteps = [
      { status: 'analyzing' as const, progress: 20, delay: 1000 },
      { status: 'translating' as const, progress: 60, delay: 2000 },
      { status: 'completed' as const, progress: 100, delay: 1500 }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setCurrentProject(prev => prev ? {
        ...prev,
        status: step.status,
        progress: step.progress,
        generatedCode: step.status === 'completed' ? generateMockTranslatedCode(selectedTargetLang.name) : undefined
      } : null);
    }
  };

  const generateMockTranslatedCode = (targetLang: string) => {
    return `<!DOCTYPE html>
<html lang="${targetLanguage}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Translated Website - ${targetLang}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Welcome to Our ${targetLang} Website</h1>
            <nav>
                <a href="#home">Home</a> |
                <a href="#about">About</a> |
                <a href="#services">Services</a> |
                <a href="#contact">Contact</a>
            </nav>
        </header>
        
        <main class="content">
            <h2>Translated Content in ${targetLang}</h2>
            <p>This website has been automatically translated and recreated with the same design and functionality as the original site.</p>
            
            <div class="features">
                <h3>Key Features:</h3>
                <ul>
                    <li>Responsive design maintained</li>
                    <li>All functionality preserved</li>
                    <li>SEO optimized for ${targetLang}</li>
                    <li>Cultural adaptations included</li>
                </ul>
            </div>
            
            <button class="btn">Get Started</button>
        </main>
    </div>
    
    <script>
        // All JavaScript functionality preserved and translated
        document.querySelector('.btn').addEventListener('click', function() {
            alert('Button clicked - functionality preserved in ${targetLang}!');
        });
    </script>
</body>
</html>`;
  };

  const handleViewInCodeGenerator = () => {
    if (currentProject?.generatedCode) {
      // In a real app, you'd pass this data through context or state management
      navigate('/code');
    }
  };

  const copyCode = () => {
    if (currentProject?.generatedCode) {
      navigator.clipboard.writeText(currentProject.generatedCode);
    }
  };

  const downloadCode = () => {
    if (currentProject?.generatedCode) {
      const blob = new Blob([currentProject.generatedCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translated-website-${currentProject.targetLanguage.code}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-6 shadow-lg transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 flex items-center space-x-2">
                <span>Website Translator</span>
                <Languages className="w-6 h-6 text-green-500 animate-pulse" />
              </h1>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300 mt-1">
                Convert websites to any language while preserving design and functionality
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 px-4 py-2 rounded-xl border border-green-200 dark:border-green-700/50">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">AI-Powered Translation</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-6">
            <Scan className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Website Input</h2>
          </div>

          <div className="space-y-6">
            {/* Input Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                Input Type
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setInputType('url')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                    inputType === 'url'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <LinkIcon className="w-5 h-5" />
                  <span className="font-medium">Website URL</span>
                </button>
                <button
                  onClick={() => setInputType('code')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                    inputType === 'code'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Code className="w-5 h-5" />
                  <span className="font-medium">HTML Code</span>
                </button>
              </div>
            </div>

            {/* URL Input */}
            {inputType === 'url' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                  Website URL
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </div>
            )}

            {/* Code Input */}
            {inputType === 'code' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                  HTML Code
                </label>
                <textarea
                  value={websiteCode}
                  onChange={(e) => setWebsiteCode(e.target.value)}
                  placeholder="Paste your HTML code here..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent resize-none h-40 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md font-mono text-sm"
                />
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleAnalyzeWebsite}
              disabled={isAnalyzing || (inputType === 'url' && !websiteUrl.trim()) || (inputType === 'code' && !websiteCode.trim())}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 dark:from-green-500 dark:to-blue-500 dark:hover:from-green-600 dark:hover:to-blue-600 text-white p-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Analyzing Website...</span>
                </>
              ) : (
                <>
                  <Scan className="w-5 h-5" />
                  <span className="font-medium">Analyze & Detect Language</span>
                </>
              )}
            </button>

            {/* Detected Language */}
            {detectedLanguage && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-xl transition-colors duration-300">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">Language Detected</p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {detectedLanguage.name} ({Math.round(detectedLanguage.confidence * 100)}% confidence)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Target Language Selection */}
            {detectedLanguage && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                  Translate To
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <option value="">Select target language</option>
                  {supportedLanguages
                    .filter(lang => lang.code !== detectedLanguage.code)
                    .map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Start Translation Button */}
            {detectedLanguage && targetLanguage && (
              <button
                onClick={handleStartTranslation}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ArrowRight className="w-5 h-5" />
                <span className="font-medium">Start Translation</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            {/* Quick Examples */}
            {inputType === 'url' && !detectedLanguage && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300 flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Quick Examples:</span>
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {quickExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setWebsiteUrl(example.url)}
                      className="text-left p-3 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 group"
                    >
                      <div className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        {example.description}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {example.url}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Languages className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Translation Progress</h2>
            </div>
          </div>

          <div className="h-full">
            {currentProject ? (
              <div className="space-y-6">
                {/* Project Info */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-800 dark:text-blue-300">
                      {currentProject.sourceLanguage.name} → {currentProject.targetLanguage.name}
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {currentProject.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div 
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${currentProject.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 capitalize">
                    {currentProject.status === 'analyzing' && 'Analyzing website structure...'}
                    {currentProject.status === 'translating' && 'Translating content and preserving functionality...'}
                    {currentProject.status === 'completed' && 'Translation completed successfully!'}
                  </p>
                </div>

                {/* Generated Code Preview */}
                {currentProject.status === 'completed' && currentProject.generatedCode && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                        Translated Website Code
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={copyCode}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group"
                          title="Copy code"
                        >
                          <Copy className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        </button>
                        <button
                          onClick={downloadCode}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 group"
                          title="Download code"
                        >
                          <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 dark:text-green-300 p-4 rounded-xl overflow-auto h-64 text-xs border border-gray-700 dark:border-gray-600 font-mono leading-relaxed shadow-inner">
                        <code>{currentProject.generatedCode}</code>
                      </pre>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleViewInCodeGenerator}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white p-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Code className="w-4 h-4" />
                        <span className="font-medium">Edit in Code Generator</span>
                      </button>
                      <button
                        className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 dark:from-green-500 dark:to-blue-500 dark:hover:from-green-600 dark:hover:to-blue-600 text-white p-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">Preview Website</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-96 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center transition-colors duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-10 h-10 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300 text-lg font-medium mb-2">
                    Translation results will appear here
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 transition-colors duration-300 max-w-sm mx-auto leading-relaxed">
                    Enter a website URL or HTML code, detect the language, and start the translation process
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTranslator;