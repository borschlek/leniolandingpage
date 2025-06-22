import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Rocket, Shield, Users, TrendingUp, Menu, Play, Twitter, Linkedin, Github } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setEmail('');
    alert('Thank you for your interest! This is a demo form.');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('backdrop-blur-lg');
        } else {
          header.classList.remove('backdrop-blur-lg');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white text-slate-900 antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-slate-900">ModernFlow</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('email-capture')}
                  className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Contact
                </button>
                <Button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('email-capture')}
                  className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Contact
                </button>
                <Button className="bg-primary-500 hover:bg-primary-600 text-white mx-3 mt-2">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-slate-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Streamline your{' '}
              <span className="text-primary-500">workflow</span>
              <br />with modern tools
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
              Boost productivity and collaboration with our comprehensive suite of workflow management tools. 
              Built for modern teams who demand efficiency and reliability.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 px-8 py-4 text-lg font-semibold transition-all duration-200"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-16 relative">
              {/* Dashboard Mockup */}
              <Card className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="p-8 bg-gradient-to-br from-slate-50 to-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white shadow-sm border border-slate-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-900">Active Projects</h3>
                        <span className="text-2xl font-bold text-primary-500">12</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{width: '68%'}}></div>
                      </div>
                    </Card>
                    <Card className="bg-white shadow-sm border border-slate-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-900">Team Members</h3>
                        <span className="text-2xl font-bold text-emerald-500">24</span>
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 bg-primary-500 rounded-full border-2 border-white"></div>
                        <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white"></div>
                        <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-white"></div>
                      </div>
                    </Card>
                    <Card className="bg-white shadow-sm border border-slate-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-900">Efficiency</h3>
                        <span className="text-2xl font-bold text-amber-500">94%</span>
                      </div>
                      <div className="text-sm text-slate-600">↗ +12% from last month</div>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Everything you need to{' '}
              <span className="text-primary-500">succeed</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600">
              Our comprehensive platform provides all the tools your team needs to collaborate, 
              manage projects, and deliver exceptional results.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="text-primary-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Experience blazing-fast performance with our optimized infrastructure 
                that scales with your growing team needs.
              </p>
            </Card>

            {/* Feature Card 2 */}
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-emerald-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Enterprise Security</h3>
              <p className="text-slate-600 leading-relaxed">
                Bank-level security with end-to-end encryption, SSO integration, 
                and compliance with industry standards.
              </p>
            </Card>

            {/* Feature Card 3 */}
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-amber-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Team Collaboration</h3>
              <p className="text-slate-600 leading-relaxed">
                Real-time collaboration tools that keep your team synchronized 
                and productive, no matter where they work from.
              </p>
            </Card>

            {/* Feature Card 4 */}
            <Card className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Smart Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Get deep insights into your workflow with advanced analytics 
                and customizable reporting dashboards.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section id="email-capture" className="py-20 sm:py-32 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of teams already using ModernFlow to streamline their workflow 
            and boost productivity. Start your free trial today.
          </p>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 rounded-lg text-slate-900 placeholder-slate-500 border-0 focus:ring-4 focus:ring-white/25 focus:outline-none text-lg bg-white"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white hover:bg-slate-50 text-primary-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-lg whitespace-nowrap disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Get Started'}
              </Button>
            </form>
            <p className="text-sm text-primary-100 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-16 border-t border-primary-400">
            <p className="text-primary-100 text-sm font-medium mb-8">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <div className="bg-white/20 rounded-lg px-6 py-3 text-white font-semibold">TechCorp</div>
              <div className="bg-white/20 rounded-lg px-6 py-3 text-white font-semibold">StartupXY</div>
              <div className="bg-white/20 rounded-lg px-6 py-3 text-white font-semibold">InnovateLab</div>
              <div className="bg-white/20 rounded-lg px-6 py-3 text-white font-semibold">FlowTeam</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-white">ModernFlow</span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Streamline your workflow with modern tools built for the future of work. 
                Designed for teams that value efficiency and collaboration.
              </p>
              <div className="flex space-x-6 mt-8">
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Product</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Security</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Integrations</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 ModernFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
