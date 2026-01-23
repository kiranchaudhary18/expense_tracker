"use client";
import { useState } from "react";

export default function GroupList({ groups, onSelectGroup }: { groups: any[], onSelectGroup: (group: any) => void }) {
  return (
    <div className="group-list">
      <h3>Groups</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id} onClick={() => onSelectGroup(group)}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
