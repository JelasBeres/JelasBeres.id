import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "Custom",
    desc: "Perfect for small projects and MVPs.",
    features: ["Responsive Design", "Basic SEO setup", "Standard Performance", "1 Month Support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "Custom",
    desc: "Ideal for growing businesses and platforms.",
    features: ["Custom Architecture", "Advanced SEO & Analytics", "95+ Lighthouse Score", "3 Months Support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Large scale systems with high availability.",
    features: ["Microservices/Serverless", "SLA Guarantees", "Dedicated Team", "24/7 Priority Support"],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-sm text-muted tracking-wider mb-4 block">
            [04] PRICING PLANS
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight">
            Transparent <span className="text-green">Investment</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "p-8 border bg-surface relative flex flex-col h-full",
                plan.highlighted ? "border-green" : "border-border"
              )}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green text-background font-mono text-xs font-bold px-3 py-1">
                  RECOMMENDED
                </div>
              )}
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">{plan.name}</h3>
              <p className="font-sans text-muted text-sm mb-6">{plan.desc}</p>
              <div className="text-3xl font-bold font-mono text-foreground mb-8">{plan.price}</div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green shrink-0" />
                    <span className="font-sans text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-3 font-sans font-bold transition-colors",
                plan.highlighted 
                  ? "bg-foreground text-background hover:bg-green" 
                  : "bg-transparent border border-border text-foreground hover:border-foreground"
              )}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
