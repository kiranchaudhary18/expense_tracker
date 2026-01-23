import { useState } from "react";
import { addExpenseToGroup } from "@/app/actions/addExpenseToGroup";
import { notifySuccess, notifyError } from "@/lib/notifications";

export default function AddGroupExpense({ groupId }: { groupId: string }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [splits, setSplits] = useState<{ userId: string; amount: number }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const transaction = await addExpenseToGroup({ groupId, text, amount, splits });
      notifySuccess(`Expense added: ${transaction.text}`);
      setText("");
      setAmount(0);
      setSplits([]);
    } catch (error) {
      console.error(error);
      notifyError("Failed to add expense");
    }
  };

  const handleAddSplit = () => {
    setSplits([...splits, { userId: "", amount: 0 }]);
  };

  const handleSplitChange = (index: number, field: string, value: string | number) => {
    const updatedSplits = [...splits];
    updatedSplits[index] = { ...updatedSplits[index], [field]: value };
    setSplits(updatedSplits);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Expense Description:</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Splits:</label>
        {splits.map((split, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="User ID"
              value={split.userId}
              onChange={(e) => handleSplitChange(index, "userId", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={split.amount}
              onChange={(e) => handleSplitChange(index, "amount", parseFloat(e.target.value))}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddSplit}>Add Split</button>
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
}