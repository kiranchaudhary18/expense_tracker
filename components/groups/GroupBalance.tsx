"use client";

export default function GroupBalance({ balances }: { balances: { name: string; amount: number }[] }) {
  return (
    <div className="group-balance">
      <h4>Group Balances</h4>
      <ul>
        {balances.map((b, i) => (
          <li key={i}>
            {b.name}: {b.amount > 0 ? `gets ₹${b.amount}` : `owes ₹${-b.amount}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
