import { Card, CardContent, Avatar, Typography, Box } from '@mui/material'
import Session from '@/lib/type'

export default function ProfileDisplay({ session }: { session: Session }) {
    return (<Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
          <CardContent sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2 
          }}>
            <Avatar
              src={session.picture}
              alt={session.name}
              sx={{ width: 96, height: 96 }}
            />
            <Typography variant="h5" component="h1">
              {session.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {session.email}
            </Typography>
          </CardContent>
        </Card>
      </Box>)
}