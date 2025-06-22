import { Card } from '@/components/ui/card';
import { Rocket, Shield, Users, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Rocket,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with our optimized infrastructure that scales with your growing team needs.",
      bgColor: "bg-primary-100",
      iconColor: "text-primary-600"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, SSO integration, and compliance with industry standards.",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time collaboration tools that keep your team synchronized and productive, no matter where they work from.",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Get deep insights into your workflow with advanced analytics and customizable reporting dashboards.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
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
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                  <IconComponent className={`${feature.iconColor} w-6 h-6`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}