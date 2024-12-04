"use server";

interface GoogleUserInfo {
    email: string;
    name: string;
    picture: string;
}

export async function getGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user info');
    }

    const data = await response.json();
    
    return {
        email: data.email,
        name: data.name,
        picture: data.picture
    };
}
