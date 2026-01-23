"use client";

export default function Reports({ reports }: { reports: any[] }) {
  return (
    <div className="reports">
      <h3>Reports & Analytics</h3>
      <ul>
        {reports.map((report, i) => (
          <li key={i}>{report.title}</li>
        ))}
      </ul>
    </div>
  );
}
