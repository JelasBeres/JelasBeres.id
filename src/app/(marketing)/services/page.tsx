import { Services } from "@/components/sections/Services";
import { getPublicServices } from "@/actions/services";

export const metadata = {
  title: "Services | JelasBeres.id",
  description: "End-to-end digital solutions tailored to your business needs.",
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await getPublicServices();

  return (
    <div className="pt-24">
      <Services services={services as any} />
    </div>
  );
}
