"use client";
import { useEffect, useState } from "react";
import getUserBalance from "@/app/actions/getUserBalance";
import { addCommas } from "@/lib/utils";

const Balance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const result = await getUserBalance();
      if (result.error) {
        setError(result.error);
      } else {
        setBalance(result.balance ?? 0);
      }
    };
    fetchBalance();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${addCommas(balance)}</h1>
    </>
  );
};

export default Balance;