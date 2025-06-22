import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  const footerLinks = {
    Product: ["Features", "Pricing", "Security", "Integrations"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Documentation", "Help Center", "Community", "Contact"],
    Legal: ["Privacy", "Terms", "Cookie Policy", "Licenses"]
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-white">ModernFlow</span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
              Streamline your workflow with our comprehensive suite of modern tools. 
              Built for teams who demand efficiency and reliability.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2024 ModernFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
              Status
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
              API
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}