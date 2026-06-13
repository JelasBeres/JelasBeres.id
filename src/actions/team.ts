"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { id: "asc" },
    });
    return { success: true, teamMembers };
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return { success: false, error: "Gagal memuat daftar tim." };
  }
}

export async function getPublicTeamMembers() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { id: "asc" },
    });
    return teamMembers;
  } catch (error) {
    console.error("Failed to fetch public team members:", error);
    return [];
  }
}

export async function createTeamMember(data: {
  name: string;
  role: string;
  photoUrl: string;
}) {
  try {
    const teamMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        photoUrl: data.photoUrl,
      },
    });

    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true, teamMember };
  } catch (error) {
    console.error("Failed to create team member:", error);
    return { success: false, error: "Gagal menambahkan anggota tim baru." };
  }
}

export async function updateTeamMember(
  id: number,
  data: {
    name: string;
    role: string;
    photoUrl: string;
  }
) {
  try {
    const teamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        photoUrl: data.photoUrl,
      },
    });

    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true, teamMember };
  } catch (error) {
    console.error("Failed to update team member:", error);
    return { success: false, error: "Gagal memperbarui data anggota tim." };
  }
}

export async function deleteTeamMember(id: number) {
  try {
    await prisma.teamMember.delete({
      where: { id },
    });

    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete team member:", error);
    return { success: false, error: "Gagal menghapus anggota tim." };
  }
}
