"use client"
import Button from '@mui/material/Button';
import signOut from '@/lib/signOutFlow';

export default function SignOutButton(){
    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <Button variant="contained" color="primary" onClick={handleSignOut}>
        Sign Out
        </Button>
    )
    
}

