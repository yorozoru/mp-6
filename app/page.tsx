import LoginButton from "@/components/LoginElement";

import { redirect } from 'next/navigation';
import getSessionData from "@/lib/getSessionData";

export default async function Home() {
  const session = await getSessionData();
  
    if (session) {
      redirect('/profile');
    }


  return (
    <main className="min-h-screen flex items-center justify-center">
      <LoginButton />
    </main>
  );
}