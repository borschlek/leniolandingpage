import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
              onClick={() => scrollToSection('email-capture')}
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
  );
}