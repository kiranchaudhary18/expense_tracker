"use client";
import { useEffect, useState } from "react";
import getIncomeExpense from "@/app/actions/getincomexpense";

const IncomeExpense = () => {
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getIncomeExpense();
            if (result.error) {
                setError(result.error);
            } else {
                setIncome(result.income ?? 0);
                setExpense(result.expense ?? 0);
            }
        };
        fetchData();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="inc-exp container">
            <div>
                <h4>Income</h4>
                <p className="money plus">${income}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">${expense}</p>
            </div>
        </div>
    );
};

export default IncomeExpense;