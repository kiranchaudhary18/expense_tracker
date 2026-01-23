'use server';
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

const addTransaction = async (formData: FormData): Promise<TransactionResult> => {
  try {
    const textValue = formData.get('text');
    const amountValue = formData.get('amount');

    if (!textValue || textValue.toString().trim() === '' || !amountValue) {
      return { error: 'Text or amount is missing' };
    }

    const text: string = textValue.toString().trim();
    const amount: number = parseFloat(amountValue.toString());

    const { userId } =  await auth();
     

    if(!userId) {
        return { error: 'User not found' };
    }

    if (isNaN(amount)) {
      return { error: 'Amount must be a valid number' };
    }

    const transactionData: TransactionData =await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath('/');

    return { data: transactionData };
  } catch (error) {
    return { error: 'Something went wrong' };
  }
};

export default addTransaction;
