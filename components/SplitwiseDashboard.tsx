import { useEffect, useState } from "react";
import GroupList from "@/components/groups/GroupList";
import GroupForm from "@/components/groups/GroupForm";
import MemberList from "@/components/groups/MemberList";
import AddGroupExpense from "@/components/groups/AddGroupExpense";
import GroupBalance from "@/components/groups/GroupBalance";
import Reports from "@/components/reports/Reports";
import { createGroup } from "@/app/actions/createGroup";

export default function SplitwiseDashboard() {
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real backend fetch for groups
    async function fetchGroups() {
      setLoading(true);
      try {
        // Example: const res = await fetch('/api/groups');
        // setGroups(await res.json());
        setGroups([]); // Placeholder for now
      } finally {
        setLoading(false);
      }
    }
    fetchGroups();
  }, []);

  const handleCreateGroup = async (name: string) => {
    // TODO: Use real backend createGroup
    const group = await createGroup({ name, userIds: [] });
    setGroups((prev) => [...prev, group]);
  };

  return (
    <div className="splitwise-dashboard">
      <aside>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={() => setSelectedGroup(null)}>All Groups</button>
          <button onClick={() => setSelectedGroup("create")}>Create Group</button>
        </nav>
        <GroupList groups={groups} onSelectGroup={setSelectedGroup} />
      </aside>
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : selectedGroup === "create" ? (
          <GroupForm onCreate={handleCreateGroup} />
        ) : selectedGroup ? (
          <>
            <h2>{selectedGroup.name}</h2>
            <MemberList members={[]} />
            <AddGroupExpense onAdd={() => {}} />
            <GroupBalance balances={[]} />
            <Reports reports={[]} />
          </>
        ) : groups.length === 0 ? (
          <div>No groups found. Create a group to get started.</div>
        ) : (
          <div>Select a group from the list to view details.</div>
        )}
      </main>
    </div>
  );
}
