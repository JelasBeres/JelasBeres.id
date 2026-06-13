import { Pricing } from "@/components/sections/Pricing";

export const metadata = {
  title: "Pricing | JelasBeres.id",
  description: "Transparent investment for your digital projects.",
};

export default function PricingPage() {
  return (
    <div className="pt-20 md:pt-32 pb-16">
      <Pricing />
    </div>
  );
}
