import getSessionData from '@/lib/getSessionData';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ProfileDisplay from '@/components/ProfileDisplay';
import Session from '@/lib/type';
import SignOutButton from '@/components/SignOut';

export default async function Profile() {
  const session: Session | null = await getSessionData();

  if (!session) {
    if (cookies().get('sessionId')){
      cookies().delete('sessionId');
    }
    redirect('/')
  }

  return (
    <div className="relative min-h-screen p-1">
      <div className="absolute top-4 right-4">
        <SignOutButton/>
      </div>
      <div>
        <ProfileDisplay session={session}/>
      </div>
    </div>
  );
}