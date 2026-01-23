'use server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";
import { Transaction } from "@/app/types/Transaction";
import getUserBalance from "./getUserBalance";


async function getTransactions(): Promise<{
     transactions?: Transaction[];
     error?: string;
}> {
    const { userId } = await  auth();

    if(!userId) {
        return { error: 'User not found' }
    }

    try {
        const transactions =  await db.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        console.log("Fetched transactions:", transactions);

         
        
        
        return { transactions };
    }catch(error){
        return { error: 'Something went wrong' };

    }
}   


export default getTransactions;