"use client";
import { useState } from "react";

export default function AddGroupExpense({ onAdd }: { onAdd: (expense: { text: string; amount: number; split: string }) => void }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [split, setSplit] = useState("equal");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (text.trim() && amount) {
          onAdd({ text: text.trim(), amount: parseFloat(amount), split });
          setText("");
          setAmount("");
        }
      }}
      className="add-group-expense"
    >
      <input
        type="text"
        placeholder="Expense description"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <select value={split} onChange={e => setSplit(e.target.value)}>
        <option value="equal">Split equally</option>
        <option value="custom">Custom split</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}
