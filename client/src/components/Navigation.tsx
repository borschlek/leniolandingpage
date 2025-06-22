import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <Button 
                onClick={() => scrollToSection('email-capture')}
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
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
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              <Button 
                onClick={() => scrollToSection('email-capture')}
                className="bg-primary-500 hover:bg-primary-600 text-white mx-3 mt-2"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}