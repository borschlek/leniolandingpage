import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setEmail('');
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
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
          {submitted ? (
            <div className="bg-white/20 rounded-lg p-6 mb-8">
              <div className="text-white text-lg font-semibold mb-2">Thank you!</div>
              <div className="text-primary-100">We'll be in touch soon with your free trial details.</div>
            </div>
          ) : (
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
          )}
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
  );
}