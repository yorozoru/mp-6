"use client";
import { googleOAuthRedirect } from "@/lib/oauth-functions";
import { Button } from "@mui/material";

export default function LoginButton() {
    const handleLogin = async () => {
        const oauthUrl = await googleOAuthRedirect();
        window.location.href = oauthUrl;
    };

    return (
        <Button
            color="primary"
            sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
            onClick={handleLogin}
        >
            <h2 className="font-bold text-white">Login with Google</h2>
        </Button>
    );
}