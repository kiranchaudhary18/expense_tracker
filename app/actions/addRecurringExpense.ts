import { prisma } from "@/lib/db";

interface AddRecurringExpenseInput {
  userId: string;
  text: string;
  amount: number;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  startDate: Date;
  endDate?: Date;
}

export async function addRecurringExpense({ userId, text, amount, frequency, startDate, endDate }: AddRecurringExpenseInput) {
  try {
    const recurringExpense = await prisma.recurringExpense.create({
      data: {
        text,
        amount,
        frequency,
        startDate,
        endDate,
        user: { connect: { id: userId } },
      },
    });

    return recurringExpense;
  } catch (error) {
    console.error("Error adding recurring expense:", error);
    throw new Error("Failed to add recurring expense");
  }
}