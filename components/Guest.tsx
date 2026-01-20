import { SignInButton } from "@clerk/nextjs";


const Guest = () => {
  return <div>
    <h1>Welcome, Guest!</h1>
    <p>Please sign in to manage your expenses.</p>
    <SignInButton/>
  </div>;
}
export default Guest;