"use client"
import Button from '@mui/material/Button';
import signOut from '@/lib/signOutFlow';

export default function SignOutButton(){
    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <Button variant="contained"
        sx={{ backgroundColor: '#C9CBE2' }} onClick={handleSignOut}>
        Sign Out
        </Button>
    )
    
}

