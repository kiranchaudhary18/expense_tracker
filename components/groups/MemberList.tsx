"use client";
import { useState } from "react";

export default function MemberList({ members }: { members: any[] }) {
  return (
    <div className="member-list">
      <h4>Members</h4>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
}
