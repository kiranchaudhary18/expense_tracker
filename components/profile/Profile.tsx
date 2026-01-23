"use client";

export default function Profile({ user }: { user: any }) {
  return (
    <div className="profile">
      <h3>Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Add more profile info and settings here */}
    </div>
  );
}
