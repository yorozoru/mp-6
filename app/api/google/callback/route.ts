import { NextRequest, NextResponse } from 'next/server';
import { getGoogleUserInfo } from '@/lib/getGoogleInfo';
import getCollection, { SESSION_LIST } from '@/lib/db';
import { randomUUID } from 'crypto'
import Session from '@/lib/type';

const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uri = process.env.GOOGLE_REDIRECT_URI;

    if (!code || !client_id || !client_secret || !redirect_uri) {
        return new Response(
            JSON.stringify({ error: 'Missing required parameters' }), 
            { status: 400 }
        );
    }

    try {
        const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id,
                client_secret,
                redirect_uri,
                grant_type: 'authorization_code',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tokens from Google');
        }

        const data = await response.json();
        const { access_token } = data;

        const googleInfo = await getGoogleUserInfo(access_token);

        const sessionsCollection = await getCollection(SESSION_LIST);
        const session: Session = {
            sessionId: randomUUID(),
            email: googleInfo.email,
            name: googleInfo.name,
            picture: googleInfo.picture,
            createdAt: new Date()
        };

        const result = await sessionsCollection.insertOne(session);

        if (!result.acknowledged){
            return new Response(
                JSON.stringify({ error: 'Database Write Failed' }), 
                { status: 500 }
            );

        }
        const sessionId = session.sessionId;

        const redirectResponse = NextResponse.redirect(new URL('/profile', request.url));
         
        redirectResponse.cookies.set('sessionId', sessionId, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 2 * 24 * 60 * 60 
        });

        return redirectResponse;

    } catch (error) {
        console.log(error) //testing
        return new Response(
            JSON.stringify({ error: 'Authentication failed' }), 
            { status: 500 }
        );
    }
}