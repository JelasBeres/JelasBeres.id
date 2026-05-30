export type ProjectCategory = "web" | "mobile" | "architect";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  techStack: string[];
  link: string;
}

export const portfolioProjects: Project[] = [
  {
    id: "fintech-dashboard",
    title: "Fintech Dashboard System",
    description: "Enterprise-grade financial dashboard with real-time trading metrics, analytics, and comprehensive reporting.",
    category: "web",
    categoryLabel: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    link: "/portfolio/fintech-dashboard",
  },
  {
    id: "health-tracker-app",
    title: "Health & Fitness Tracker",
    description: "Cross-platform mobile application for tracking workouts, nutrition, and daily activities with wearable integration.",
    category: "mobile",
    categoryLabel: "Mobile Development",
    image: "https://images.unsplash.com/photo-1526502325396-1ea061b40285?auto=format&fit=crop&q=80&w=1200",
    techStack: ["React Native", "Expo", "GraphQL", "PostgreSQL"],
    link: "/portfolio/health-tracker-app",
  },
  {
    id: "ecommerce-platform",
    title: "Global E-Commerce Platform",
    description: "High-performance headless e-commerce solution supporting multi-currency and multi-language shopping experiences.",
    category: "web",
    categoryLabel: "Web Development",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1200",
    techStack: ["Next.js", "Shopify Plus", "Framer Motion", "Stripe"],
    link: "/portfolio/ecommerce-platform",
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure Migration",
    description: "Complete architectural redesign and migration to a serverless microservices architecture for a SaaS platform.",
    category: "architect",
    categoryLabel: "Architect",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    techStack: ["AWS", "Terraform", "Docker", "Kubernetes"],
    link: "/portfolio/cloud-infrastructure",
  },
  {
    id: "logistics-mobile-app",
    title: "Logistics Delivery App",
    description: "Driver tracking and delivery management application with real-time GPS routing and offline capabilities.",
    category: "mobile",
    categoryLabel: "Mobile Development",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1200",
    techStack: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
    link: "/portfolio/logistics-mobile-app",
  },
  {
    id: "data-pipeline-architecture",
    title: "Enterprise Data Pipeline",
    description: "Scalable data ingestion and processing pipeline handling millions of events per second with sub-second latency.",
    category: "architect",
    categoryLabel: "Architect",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    techStack: ["Apache Kafka", "Snowflake", "Python", "Airflow"],
    link: "/portfolio/data-pipeline-architecture",
  },
];
