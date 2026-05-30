import { cookies } from "next/headers";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("jelasberes_admin_session")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  // Simple authentication: cookie contains the admin password
  return sessionToken === adminPassword;
}
