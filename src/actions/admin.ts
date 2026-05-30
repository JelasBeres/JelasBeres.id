"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function loginAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@jelasberes.id";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (email === adminEmail && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set("jelasberes_admin_session", adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Email atau password salah." };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("jelasberes_admin_session");
  return { success: true };
}

export async function getDashboardStats() {
  try {
    const [projectCount, contactCount, testimonialCount, serviceCount, pendingContacts, recentContacts] = await Promise.all([
      prisma.project.count(),
      prisma.contact.count(),
      prisma.testimonial.count(),
      prisma.service.count(),
      prisma.contact.count({ where: { status: "pending" } }),
      prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return {
      success: true,
      stats: {
        projectCount,
        contactCount,
        testimonialCount,
        serviceCount,
        pendingContacts,
      },
      recentContacts,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { success: false, error: "Gagal memuat statistik." };
  }
}

export async function seedSampleData() {
  try {
    // Clear existing data
    await prisma.contact.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.testimonial.deleteMany({});
    await prisma.service.deleteMany({});

    // Seed Services
    const webService = await prisma.service.create({
      data: {
        slug: "web-development",
        title: "Web Development",
        description: "Pembuatan aplikasi web modern yang cepat, aman, dan responsif menggunakan teknologi Next.js, React, dan Tailwind CSS.",
        icon: "Globe",
        features: ["Next.js & React App", "Responsive Design", "SEO Optimization", "Prisma/Neon DB Integration", "Tailwind CSS Styling"],
        priceFrom: "Rp 5.000.000",
        isFeatured: true,
      },
    });

    const mobileService = await prisma.service.create({
      data: {
        slug: "mobile-development",
        title: "Mobile App Development",
        description: "Pengembangan aplikasi Android dan iOS native maupun cross-platform menggunakan Flutter dan React Native.",
        icon: "Smartphone",
        features: ["Android & iOS Builds", "Smooth Animations", "App Store & Play Store Publish", "Offline Support", "Push Notifications"],
        priceFrom: "Rp 10.000.000",
        isFeatured: true,
      },
    });

    const mlService = await prisma.service.create({
      data: {
        slug: "machine-learning",
        title: "Machine Learning & AI Integration",
        description: "Pengembangan model AI, klasifikasi data, integrasi Large Language Models (LLM), dan pipeline data otomatis.",
        icon: "Cpu",
        features: ["LLM Custom Integration", "Predictive Analytics", "Data Pipeline Pipeline", "API Endpoint Deployments", "Custom NLP Models"],
        priceFrom: "Rp 15.000.000",
        isFeatured: true,
      },
    });

    // Seed Projects
    await prisma.project.createMany({
      data: [
        {
          title: "SaaS Brutalist Analytics Dashboard",
          slug: "saas-brutalist-analytics",
          description: "Dasbor analitik SaaS berkinerja tinggi dengan antarmuka brutalist bergaya retro, menampilkan bagan real-time dan statistik pengunjung.",
          techStack: ["Next.js", "React", "Prisma", "Tailwind CSS", "Recharts"],
          thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
          liveUrl: "https://demo.jelasberes.id/analytics",
          repoUrl: "https://github.com/jelasberes/analytics",
          category: "web",
          featured: true,
          orderIndex: 1,
        },
        {
          title: "FitTrack Mobile App Companion",
          slug: "fittrack-mobile-app",
          description: "Aplikasi seluler pelacakan kebugaran dengan visualisasi data latihan harian, sinkronisasi dengan smartwatch, dan mode offline penuh.",
          techStack: ["React Native", "Expo", "Redux Toolkit", "SQLite", "Framer Motion"],
          thumbnailUrl: "https://images.unsplash.com/photo-1510051640316-ecc398a3e65b?q=80&w=600&auto=format&fit=crop",
          liveUrl: "https://play.google.com/store",
          repoUrl: "https://github.com/jelasberes/fittrack",
          category: "mobile",
          featured: true,
          orderIndex: 2,
        },
        {
          title: "Predictive Demand Engine API",
          slug: "predictive-demand-engine",
          description: "Model prediksi permintaan inventaris untuk perusahaan ritel menggunakan algoritma XGBoost dan disajikan melalui REST API FastAPi.",
          techStack: ["Python", "FastAPI", "XGBoost", "Docker", "PostgreSQL"],
          thumbnailUrl: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop",
          liveUrl: null,
          repoUrl: "https://github.com/jelasberes/demand-prediction",
          category: "ml",
          featured: true,
          orderIndex: 3,
        },
        {
          title: "Modern Architect Portfolio Site",
          slug: "modern-architect-portfolio",
          description: "Website portofolio interaktif untuk studio arsitektur terkemuka dengan rendering gambar 3D WebGL dan desain clean minimalis.",
          techStack: ["Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
          thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
          liveUrl: "https://architect-demo.jelasberes.id",
          repoUrl: null,
          category: "architect",
          featured: false,
          orderIndex: 4,
        },
      ],
    });

    // Seed Testimonials
    await prisma.testimonial.createMany({
      data: [
        {
          clientName: "Budi Santoso",
          clientRole: "CEO",
          company: "Mandiri Jaya Group",
          avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
          content: "Tim JelasBeres.id sangat profesional. Website perusahaan kami diselesaikan dalam waktu kurang dari 3 minggu dengan performa luar biasa.",
          rating: 5,
          isPublished: true,
        },
        {
          clientName: "Siti Rahma",
          clientRole: "Marketing Director",
          company: "Cahaya Retailindo",
          avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
          content: "Aplikasi seluler FitTrack yang dibuat oleh JelasBeres mendapat feedback sangat baik dari pelanggan kami. Navigasinya mulus dan tanpa kendala.",
          rating: 5,
          isPublished: true,
        },
      ],
    });

    // Seed Contact submissions
    await prisma.contact.createMany({
      data: [
        {
          name: "Rian Hidayat",
          email: "rian@hidayatcorp.com",
          company: "Hidayat Corp",
          serviceType: "Web Development",
          message: "Halo, saya tertarik untuk membuat website e-commerce custom dengan dashboard inventaris. Mohon dikirimkan proposal penawarannya.",
          status: "pending",
        },
        {
          name: "Devi Lestari",
          email: "devi.l@retailindo.id",
          company: "Retailindo Indonesia",
          serviceType: "Mobile App Development",
          message: "Kami ingin melakukan revamp aplikasi Android/iOS kami yang sudah ada. Berapa estimasi biaya dan waktunya?",
          status: "contacted",
        },
      ],
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to seed sample data:", error);
    return { success: false, error: "Gagal melakukan seeding data." };
  }
}
