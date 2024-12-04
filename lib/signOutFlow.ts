"use server";
import { cookies } from 'next/headers';
import getCollection, { SESSION_LIST } from './db';
import { redirect } from 'next/navigation';

export default async function signOut(){
    const cookieStore = cookies();
    const sessionId = cookieStore.get('sessionId');
    const collection = await getCollection(SESSION_LIST);

    if (sessionId){
    const deleteEntry = await collection.deleteOne({sessionId: sessionId.value})
    if (!deleteEntry) {
        return null;
      }
    cookieStore.delete('sessionId');
    redirect('/')
    }

}