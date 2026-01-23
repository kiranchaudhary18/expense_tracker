"use client";
import { useState } from "react";

export default function GroupForm({ onCreate }: { onCreate: (name: string) => void }) {
  const [name, setName] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (name.trim()) {
          onCreate(name.trim());
          setName("");
        }
      }}
      className="group-form"
    >
      <input
        type="text"
        placeholder="Group name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Create Group</button>
    </form>
  );
}
