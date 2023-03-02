import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
    const { user } = useAuth();
    useEffect(() => {
        console.log(user);
    }, []);
    return (
        <div className="text-t-primary">
            <div>This is profile page!</div>
            Your email is: {user?.email}
        </div>
    );
}

export default ProfilePage;
