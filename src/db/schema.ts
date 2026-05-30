import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  serviceType: text("service_type").notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  techStack: jsonb("tech_stack").$type<string[]>().notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  category: text("category").notNull(),
  featured: boolean("featured").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientRole: text("client_role").notNull(),
  company: text("company").notNull(),
  avatarUrl: text("avatar_url"),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
  priceFrom: text("price_from"),
  isFeatured: boolean("is_featured").default(false).notNull(),
});
