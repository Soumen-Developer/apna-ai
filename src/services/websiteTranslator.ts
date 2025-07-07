// Website Translation Service
// This integrates with Google Gemini API for website translation

interface WebsiteAnalysis {
  detectedLanguage: {
    code: string;
    name: string;
    confidence: number;
  };
  structure: {
    title: string;
    description: string;
    headings: string[];
    textContent: string[];
    images: { src: string; alt: string }[];
    links: { href: string; text: string }[];
  };
  technologies: string[];
}

interface TranslationRequest {
  sourceContent: string;
  sourceLanguage: string;
  targetLanguage: string;
  preserveStructure: boolean;
  includeMetadata: boolean;
}

interface TranslationResult {
  translatedCode: string;
  translatedContent: {
    title: string;
    description: string;
    headings: string[];
    textContent: string[];
    imageAlts: string[];
  };
  metadata: {
    sourceLanguage: string;
    targetLanguage: string;
    translationTime: number;
    wordCount: number;
  };
}

class WebsiteTranslatorService {
  private geminiApiKey: string;
  private baseUrl: string;

  constructor() {
    this.geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  }

  async analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
    try {
      // In production, this would fetch and analyze the actual website
      // For demo purposes, we'll return mock data
      
      const mockAnalysis: WebsiteAnalysis = {
        detectedLanguage: {
          code: 'es',
          name: 'Spanish',
          confidence: 0.95
        },
        structure: {
          title: 'Bienvenido a Nuestro Sitio Web',
          description: 'Una descripción de nuestro sitio web en español',
          headings: ['Inicio', 'Acerca de', 'Servicios', 'Contacto'],
          textContent: [
            'Este es el contenido principal de la página',
            'Ofrecemos servicios de alta calidad',
            'Contáctanos para más información'
          ],
          images: [
            { src: '/hero-image.jpg', alt: 'Imagen principal' },
            { src: '/about-us.jpg', alt: 'Acerca de nosotros' }
          ],
          links: [
            { href: '/inicio', text: 'Inicio' },
            { href: '/servicios', text: 'Servicios' }
          ]
        },
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap']
      };

      return mockAnalysis;
    } catch (error) {
      console.error('Website analysis error:', error);
      throw new Error('Failed to analyze website');
    }
  }

  async analyzeCode(htmlCode: string): Promise<WebsiteAnalysis> {
    try {
      // Parse HTML and extract content for analysis
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, 'text/html');
      
      // Extract text content for language detection
      const textContent = doc.body?.textContent || '';
      
      // Mock language detection based on content
      const detectedLanguage = this.detectLanguageFromText(textContent);
      
      const analysis: WebsiteAnalysis = {
        detectedLanguage,
        structure: {
          title: doc.title || 'Untitled',
          description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
          headings: Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => h.textContent || ''),
          textContent: Array.from(doc.querySelectorAll('p, div, span')).map(el => el.textContent || '').filter(text => text.trim()),
          images: Array.from(doc.querySelectorAll('img')).map(img => ({
            src: img.getAttribute('src') || '',
            alt: img.getAttribute('alt') || ''
          })),
          links: Array.from(doc.querySelectorAll('a')).map(link => ({
            href: link.getAttribute('href') || '',
            text: link.textContent || ''
          }))
        },
        technologies: this.detectTechnologies(htmlCode)
      };

      return analysis;
    } catch (error) {
      console.error('Code analysis error:', error);
      throw new Error('Failed to analyze code');
    }
  }

  async translateWebsite(request: TranslationRequest): Promise<TranslationResult> {
    try {
      // In production, this would use Google Gemini API for translation
      const translatedCode = await this.generateTranslatedCode(request);
      
      const result: TranslationResult = {
        translatedCode,
        translatedContent: {
          title: 'Welcome to Our Website',
          description: 'A description of our website in English',
          headings: ['Home', 'About', 'Services', 'Contact'],
          textContent: [
            'This is the main content of the page',
            'We offer high-quality services',
            'Contact us for more information'
          ],
          imageAlts: ['Main image', 'About us']
        },
        metadata: {
          sourceLanguage: request.sourceLanguage,
          targetLanguage: request.targetLanguage,
          translationTime: Date.now(),
          wordCount: request.sourceContent.split(' ').length
        }
      };

      return result;
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate website');
    }
  }

  private detectLanguageFromText(text: string): { code: string; name: string; confidence: number } {
    // Simple language detection based on common words
    const languagePatterns = [
      { code: 'es', name: 'Spanish', patterns: ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al', 'del', 'los', 'las'] },
      { code: 'fr', name: 'French', patterns: ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir', 'que', 'pour', 'dans', 'ce', 'son', 'une', 'sur', 'avec', 'ne', 'se', 'pas', 'tout', 'plus', 'par'] },
      { code: 'de', name: 'German', patterns: ['der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich', 'des', 'auf', 'für', 'ist', 'im', 'dem', 'nicht', 'ein', 'eine', 'als', 'auch', 'es', 'an', 'werden'] },
      { code: 'it', name: 'Italian', patterns: ['il', 'di', 'che', 'e', 'la', 'per', 'un', 'in', 'con', 'del', 'da', 'a', 'al', 'le', 'si', 'dei', 'sul', 'una', 'alla', 'lo', 'nel', 'della', 'gli', 'delle'] },
      { code: 'pt', name: 'Portuguese', patterns: ['de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'é', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas'] }
    ];

    const words = text.toLowerCase().split(/\s+/);
    let bestMatch = { code: 'en', name: 'English', confidence: 0.5 };

    for (const lang of languagePatterns) {
      const matches = words.filter(word => lang.patterns.includes(word)).length;
      const confidence = matches / Math.min(words.length, 100);
      
      if (confidence > bestMatch.confidence) {
        bestMatch = { ...lang, confidence };
      }
    }

    return bestMatch;
  }

  private detectTechnologies(htmlCode: string): string[] {
    const technologies: string[] = [];
    
    if (htmlCode.includes('<!DOCTYPE html>')) technologies.push('HTML5');
    if (htmlCode.includes('bootstrap')) technologies.push('Bootstrap');
    if (htmlCode.includes('jquery')) technologies.push('jQuery');
    if (htmlCode.includes('react')) technologies.push('React');
    if (htmlCode.includes('vue')) technologies.push('Vue.js');
    if (htmlCode.includes('angular')) technologies.push('Angular');
    if (htmlCode.includes('tailwind')) technologies.push('Tailwind CSS');
    if (htmlCode.includes('<style>') || htmlCode.includes('.css')) technologies.push('CSS3');
    if (htmlCode.includes('<script>') || htmlCode.includes('.js')) technologies.push('JavaScript');
    
    return technologies.length > 0 ? technologies : ['HTML', 'CSS', 'JavaScript'];
  }

  private async generateTranslatedCode(request: TranslationRequest): Promise<string> {
    // In production, this would use Google Gemini API
    // For demo purposes, return a mock translated website
    
    const targetLangName = this.getLanguageName(request.targetLanguage);
    
    return `<!DOCTYPE html>
<html lang="${request.targetLanguage}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Website - ${targetLangName}</title>
    <meta name="description" content="A professional website translated to ${targetLangName} while preserving all original functionality and design.">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 30px;
        }
        
        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
            color: #667eea;
        }
        
        .hero {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 60px 40px;
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            text-align: center;
            margin-bottom: 40px;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero p {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 30px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .feature-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-card h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .footer {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .nav-links {
                gap: 15px;
            }
            
            .container {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <nav>
                <div class="logo">YourBrand</div>
                <ul class="nav-links">
                    <li><a href="#home">${this.getTranslatedText('Home', request.targetLanguage)}</a></li>
                    <li><a href="#about">${this.getTranslatedText('About', request.targetLanguage)}</a></li>
                    <li><a href="#services">${this.getTranslatedText('Services', request.targetLanguage)}</a></li>
                    <li><a href="#contact">${this.getTranslatedText('Contact', request.targetLanguage)}</a></li>
                </ul>
            </nav>
        </header>
        
        <section class="hero">
            <h1>${this.getTranslatedText('Welcome to Our Website', request.targetLanguage)}</h1>
            <p>${this.getTranslatedText('We provide exceptional services with cutting-edge technology and innovative solutions tailored to your needs.', request.targetLanguage)}</p>
            <a href="#contact" class="cta-button">${this.getTranslatedText('Get Started', request.targetLanguage)}</a>
        </section>
        
        <section class="features">
            <div class="feature-card">
                <h3>${this.getTranslatedText('Professional Quality', request.targetLanguage)}</h3>
                <p>${this.getTranslatedText('We deliver high-quality solutions that meet international standards and exceed expectations.', request.targetLanguage)}</p>
            </div>
            
            <div class="feature-card">
                <h3>${this.getTranslatedText('Fast Delivery', request.targetLanguage)}</h3>
                <p>${this.getTranslatedText('Our efficient processes ensure quick turnaround times without compromising on quality.', request.targetLanguage)}</p>
            </div>
            
            <div class="feature-card">
                <h3>${this.getTranslatedText('24/7 Support', request.targetLanguage)}</h3>
                <p>${this.getTranslatedText('Round-the-clock customer support to assist you whenever you need help.', request.targetLanguage)}</p>
            </div>
        </section>
        
        <footer class="footer">
            <p>&copy; 2024 YourBrand. ${this.getTranslatedText('All rights reserved.', request.targetLanguage)}</p>
            <p>${this.getTranslatedText('Translated and optimized for', request.targetLanguage)} ${targetLangName} ${this.getTranslatedText('speakers', request.targetLanguage)}.</p>
        </footer>
    </div>
    
    <script>
        // Preserve all original functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            // Add interactive effects
            const featureCards = document.querySelectorAll('.feature-card');
            featureCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.2)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                });
            });
            
            // Language-specific functionality
            console.log('Website loaded in ${targetLangName}');
            
            // CTA button interaction
            document.querySelector('.cta-button').addEventListener('click', function(e) {
                e.preventDefault();
                alert('${this.getTranslatedText('Thank you for your interest! We will contact you soon.', request.targetLanguage)}');
            });
        });
    </script>
</body>
</html>`;
  }

  private getLanguageName(code: string): string {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
      'ar': 'Arabic',
      'hi': 'Hindi',
      'th': 'Thai',
      'vi': 'Vietnamese',
      'tr': 'Turkish',
      'nl': 'Dutch',
      'sv': 'Swedish',
      'da': 'Danish',
      'no': 'Norwegian',
      'fi': 'Finnish'
    };
    
    return languages[code] || 'Unknown';
  }

  private getTranslatedText(text: string, targetLang: string): string {
    // Mock translations for demo purposes
    const translations: { [key: string]: { [key: string]: string } } = {
      'es': {
        'Home': 'Inicio',
        'About': 'Acerca de',
        'Services': 'Servicios',
        'Contact': 'Contacto',
        'Welcome to Our Website': 'Bienvenido a Nuestro Sitio Web',
        'We provide exceptional services with cutting-edge technology and innovative solutions tailored to your needs.': 'Proporcionamos servicios excepcionales con tecnología de vanguardia y soluciones innovadoras adaptadas a sus necesidades.',
        'Get Started': 'Comenzar',
        'Professional Quality': 'Calidad Profesional',
        'We deliver high-quality solutions that meet international standards and exceed expectations.': 'Entregamos soluciones de alta calidad que cumplen con los estándares internacionales y superan las expectativas.',
        'Fast Delivery': 'Entrega Rápida',
        'Our efficient processes ensure quick turnaround times without compromising on quality.': 'Nuestros procesos eficientes aseguran tiempos de entrega rápidos sin comprometer la calidad.',
        '24/7 Support': 'Soporte 24/7',
        'Round-the-clock customer support to assist you whenever you need help.': 'Soporte al cliente las 24 horas para ayudarte cuando necesites asistencia.',
        'All rights reserved.': 'Todos los derechos reservados.',
        'Translated and optimized for': 'Traducido y optimizado para',
        'speakers': 'hablantes',
        'Thank you for your interest! We will contact you soon.': '¡Gracias por su interés! Nos pondremos en contacto con usted pronto.'
      },
      'fr': {
        'Home': 'Accueil',
        'About': 'À propos',
        'Services': 'Services',
        'Contact': 'Contact',
        'Welcome to Our Website': 'Bienvenue sur Notre Site Web',
        'We provide exceptional services with cutting-edge technology and innovative solutions tailored to your needs.': 'Nous fournissons des services exceptionnels avec une technologie de pointe et des solutions innovantes adaptées à vos besoins.',
        'Get Started': 'Commencer',
        'Professional Quality': 'Qualité Professionnelle',
        'We deliver high-quality solutions that meet international standards and exceed expectations.': 'Nous livrons des solutions de haute qualité qui répondent aux normes internationales et dépassent les attentes.',
        'Fast Delivery': 'Livraison Rapide',
        'Our efficient processes ensure quick turnaround times without compromising on quality.': 'Nos processus efficaces garantissent des délais de livraison rapides sans compromettre la qualité.',
        '24/7 Support': 'Support 24/7',
        'Round-the-clock customer support to assist you whenever you need help.': 'Support client 24h/24 pour vous aider chaque fois que vous avez besoin d\'aide.',
        'All rights reserved.': 'Tous droits réservés.',
        'Translated and optimized for': 'Traduit et optimisé pour',
        'speakers': 'locuteurs',
        'Thank you for your interest! We will contact you soon.': 'Merci pour votre intérêt ! Nous vous contacterons bientôt.'
      }
    };

    return translations[targetLang]?.[text] || text;
  }
}

export default new WebsiteTranslatorService();