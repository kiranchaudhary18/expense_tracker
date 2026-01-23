"use client";

import { useEffect, useState } from "react";
import getTransactions from "@/app/actions/getTransaction";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const result = await getTransactions();

        if (result?.error) {
          setError(result.error);
        } else {
          setTransactions(result?.transactions || []);
        }
      } catch (err) {
        setError("Failed to fetch transactions.");
      }
    };

    fetchTransactions();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h3>History</h3>

      <ul className="list">
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.text} - ₹{transaction.amount}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
