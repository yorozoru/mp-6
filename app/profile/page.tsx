import getSessionData from '@/lib/getSessionData';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ProfileDisplay from '@/components/ProfileDisplay';
import Session from '@/lib/type';

export default async function Profile() {
  const session: Session | null = await getSessionData();

  if (!session) {
    cookies().delete('sessionId');
    redirect('/')
  }

  return (
    <ProfileDisplay session={session}/>
  );
}