"use client"
import Button from '@mui/material/Button';
import signOut from '@/lib/signOutFlow';

export default function SignOutButton(){
    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <Button variant="contained"
        sx={{ backgroundColor: '#979BC7' }} onClick={handleSignOut}>
        Sign Out
        </Button>
    )
    
}

