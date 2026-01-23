import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import Dashboard from "@/components/Dashboard";


const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }

  
  return <Dashboard userName={user.firstName || "User"} />;
};

export default HomePage;