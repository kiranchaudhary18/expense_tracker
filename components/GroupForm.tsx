import { useState } from "react";
import { createGroup } from "@/app/actions/createGroup";
import { notifySuccess, notifyError } from "@/lib/notifications";

export default function GroupForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userIds, setUserIds] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const group = await createGroup({ name, description, userIds });
      notifySuccess(`Group created: ${group.name}`);
      setName("");
      setDescription("");
      setUserIds([]);
    } catch (error) {
      console.error(error);
      notifyError("Failed to create group");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Group Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userIds">Add Members (comma-separated user IDs):</label>
        <input
          type="text"
          id="userIds"
          value={userIds.join(",")}
          onChange={(e) => setUserIds(e.target.value.split(","))}
        />
      </div>
      <button type="submit">Create Group</button>
    </form>
  );
}