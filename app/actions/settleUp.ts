import { prisma } from "@/lib/db";

interface SettleUpInput {
  userId: string;
  groupId: string;
  amount: number;
}

export async function settleUp({ userId, groupId, amount }: SettleUpInput) {
  try {
    const settlement = await prisma.transaction.create({
      data: {
        text: "Settlement",
        amount: -amount,
        user: { connect: { id: userId } },
        group: { connect: { id: groupId } },
      },
    });

    return settlement;
  } catch (error) {
    console.error("Error settling up:", error);
    throw new Error("Failed to settle up");
  }
}