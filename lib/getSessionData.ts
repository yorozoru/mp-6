import { cookies } from 'next/headers';
import getCollection, { SESSION_LIST } from '@/lib/db';
import type Session from '@/lib/type';

export default async function getSessionData(): Promise<Session | null> {
    const cookieStore = cookies();
    const sessionId = cookieStore.get('sessionId');
    
    if (!sessionId) {
      return null;
    }
  
    const collection = await getCollection(SESSION_LIST);
    const doc = await collection.findOne({ sessionId: sessionId.value });
  
    if (!doc) {
      return null;
    }

    const session: Session = {
      sessionId: doc.sessionId,
      email: doc.email,
      name: doc.name,
      picture: doc.picture,
      createdAt: doc.createdAt
    };
  
    return session;
}