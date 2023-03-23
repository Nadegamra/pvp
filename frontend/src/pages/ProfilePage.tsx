import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
    const { user } = useAuth();
    useEffect(() => {
        console.log(user);
    }, []);
    return (
        <div className="flex justify-center content-center">
            <div className="text-t-primary bg-bg-secondary w-[30rem] mt-20 rounded-lg p-5">
                <div className="font-bold text-center text-[25px]">Profile</div>
                <div>Email: {user?.email}</div>
                <div>
                    Email status:{' '}
                    {user?.emailConfirmed ?? false ? (
                        <span className="text-success-500">CONFIRMED</span>
                    ) : (
                        <span className="text-danger-500">UNCONFIRMED</span>
                    )}
                </div>
                {user !== undefined && user.role !== 'company' ? (
                    <div>
                        <div>First Name: {user?.firstName}</div>
                        <div>Last Name: {user?.lastName}</div>
                    </div>
                ) : (
                    <div>
                        <div>Company code: {user?.companyCode}</div>
                        <div>Company name: {user?.companyName}</div>
                    </div>
                )}
                <div>Account level: {user?.role}</div>
            </div>
        </div>
    );
}

export default ProfilePage;
