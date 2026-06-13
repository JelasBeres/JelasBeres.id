import { Hero } from "@/components/sections/Hero";
import { Contact } from "@/components/sections/Contact";
import { getPublicServices } from "@/actions/services";

export const revalidate = 0;

export default async function MarketingPage() {
  const services = await getPublicServices();

  return (
    <>
      <Hero />
      <Contact services={services as any} />
    </>
  );
}
