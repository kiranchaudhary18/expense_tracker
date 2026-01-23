import { useState } from "react";

export default function SearchFilter({ transactions, onFilter }: { transactions: any[]; onFilter: (filtered: any[]) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const handleSearch = () => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter((t) => t.text.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (filterType === "income") {
      filtered = filtered.filter((t) => t.amount > 0);
    } else if (filterType === "expense") {
      filtered = filtered.filter((t) => t.amount < 0);
    }

    onFilter(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}