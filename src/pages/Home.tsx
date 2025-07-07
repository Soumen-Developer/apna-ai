import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Code, Zap, Star, Users, Shield, ArrowRight, Check, Globe, Image } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "AI Chat Assistant",
      description: "Get intelligent responses powered by Google Gemini for any question or task"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Generation",
      description: "Generate complete applications with our advanced AI-powered development environment"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Website Translation",
      description: "Convert websites to any language while preserving design and functionality"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Experience blazing-fast responses and real-time code generation"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy"
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Image & Video Generation",
      description: "Create stunning images and videos from text prompts."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Management",
      description: "Manage user access and permissions"
    }

  ];

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: ["10 chat messages/day", "Basic code generation", "1 website translation/day", "Community support"],
      cta: "Get Started Free",
      featured: false
    },
    {
      name: "Pro",
      price: "₹19",
      period: "per month",
      features: ["Unlimited chat messages", "Advanced code generation", "Unlimited translations", "Priority support", "Save & export projects"],
      cta: "Start Pro Trial",
      featured: true
    },
    {
      name: "Enterprise",
      price: "₹99",
      period: "per month",
      features: ["Everything in Pro", "Custom AI training", "API access", "Dedicated support", "White-label solution"],
      cta: "Contact Sales",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-700/50 transition-all duration-300">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ developers worldwide
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300 leading-tight">
              Build the Future with
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {" "}Apna AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors duration-300 leading-relaxed">
              The ultimate AI-powered platform for intelligent conversations, code generation, and website translation. 
              Chat with AI, build applications, and translate websites instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/chat"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl dark:hover:shadow-blue-500/25 flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start Chatting</span>
              </Link>
              <Link
                to="/translate"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-700/25 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Globe className="w-5 h-5" />
                <span>Translate Website</span>
              </Link>
              <Link
                to="/media-generator"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-700/25 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Image className="w-5 h-5" />
                <span>Generate Image/Video</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Powerful Features for Modern Development
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Everything you need to build, chat, translate, and innovate with AI-powered tools
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/25 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div className="group">
              <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <div className="text-blue-100 dark:text-blue-200 text-lg font-medium">Active Users</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">1M+</div>
              <div className="text-blue-100 dark:text-blue-200 text-lg font-medium">AI Responses</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">50K+</div>
              <div className="text-blue-100 dark:text-blue-200 text-lg font-medium">Apps Generated</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">25K+</div>
              <div className="text-blue-100 dark:text-blue-200 text-lg font-medium">Sites Translated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Start free and upgrade as you grow. All plans include our core AI features.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.featured 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white transform scale-105 shadow-2xl dark:shadow-blue-500/25' 
                  : 'bg-white dark:bg-gray-900 hover:shadow-xl dark:hover:shadow-gray-900/25 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600'
              }`}>
                {plan.featured && (
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className={`text-xl font-semibold mb-2 ${plan.featured ? 'text-white' : 'text-gray-900 dark:text-white transition-colors duration-300'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className={`text-5xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900 dark:text-white transition-colors duration-300'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ml-1 ${plan.featured ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300 transition-colors duration-300'}`}>
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.featured ? 'bg-white/20' : 'bg-green-100 dark:bg-green-900/30'}`}>
                          <Check className={`w-3 h-3 ${plan.featured ? 'text-white' : 'text-green-600 dark:text-green-400'}`} />
                        </div>
                        <span className={`text-sm ${plan.featured ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300 transition-colors duration-300'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/signup"
                    className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 inline-block hover:scale-105 ${
                      plan.featured 
                        ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-50"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 transition-colors duration-300 leading-relaxed">
            Join thousands of developers and creators who are already using Apna AI to bring their ideas to life.
          </p>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-10 py-5 rounded-xl text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl dark:hover:shadow-blue-500/25 inline-flex items-center space-x-3 shadow-xl"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;