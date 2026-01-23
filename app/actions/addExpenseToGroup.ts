import { prisma } from "@/lib/db";

interface AddExpenseInput {
  groupId: string;
  text: string;
  amount: number;
  splits: { userId: string; amount: number }[]; // Array of user splits
}

export async function addExpenseToGroup({ groupId, text, amount, splits }: AddExpenseInput) {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        text,
        amount,
        group: { connect: { id: groupId } },
        splits: {
          create: splits.map((split) => ({
            amount: split.amount,
            user: { connect: { id: split.userId } },
          })),
        },
      },
    });

    return transaction;
  } catch (error) {
    console.error("Error adding expense to group:", error);
    throw new Error("Failed to add expense to group");
  }
}