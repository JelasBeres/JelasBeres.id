import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { getPublicPricingPlans } from "@/actions/pricing";

export async function Pricing() {
  const plans = await getPublicPricingPlans();

  return (
    <section id="pricing" className="py-4 md:py-6 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2 block">
            [04] PRICING PLANS
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground uppercase tracking-tight">
            Transparent <span className="text-green">Investment</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 md:gap-x-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "p-5 md:p-6 border bg-surface relative flex flex-col h-full",
                plan.highlighted ? "border-green" : "border-border"
              )}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green text-background font-mono text-[9px] font-bold px-2.5 py-0.5 tracking-wider">
                  RECOMMENDED
                </div>
              )}
              <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-green transition-colors duration-300 uppercase">{plan.name}</h3>
              <p className="font-sans text-muted text-xs mb-4 leading-relaxed">{plan.description}</p>
              <div className="text-2xl font-bold font-mono text-foreground mb-5">{plan.price}</div>
              
              <ul className="flex-1 space-y-2.5 mb-6">
                {Array.isArray(plan.features) && plan.features.map((feature: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-foreground leading-normal">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors active:scale-95 transition-all duration-300",
                plan.highlighted 
                  ? "bg-foreground text-background hover:bg-green hover:text-white" 
                  : "bg-transparent border border-border text-foreground hover:border-foreground hover:bg-surface-hover"
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
