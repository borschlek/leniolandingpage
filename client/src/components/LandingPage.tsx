import Navigation from './Navigation';
import Hero from './Hero';
import Features from './Features';
import EmailCapture from './EmailCapture';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="bg-white text-slate-900 antialiased">
      <Navigation />
      <Hero />
      <Features />
      <EmailCapture />
      <Footer />
    </div>
  );
}