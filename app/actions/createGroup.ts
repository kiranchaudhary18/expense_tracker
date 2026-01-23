import { db } from "@/lib/db";

interface CreateGroupInput {
  name: string;
  description?: string;
  userIds: string[]; // List of user IDs to add to the group
}

export async function createGroup({ name, description, userIds }: CreateGroupInput) {
  try {
    const group = await db.group.create({
      data: {
        name,
        description,
        members: {
          create: userIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
    });

    return group;
  } catch (error) {
    console.error("Error creating group:", error);
    throw new Error("Failed to create group");
  }
}