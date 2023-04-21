import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

function ProfilePage() {
    const { t } = useTranslation();
    const { user } = useAuth();
    useEffect(() => {
        console.log(user);
    }, []);
    return (
        <div className="flex justify-center content-center">
            <div className="text-t-primary bg-bg-secondary w-[30rem] mt-20 rounded-lg p-5">
                <div className="font-bold text-center text-[25px]">{t('profile.profile')}</div>
                <div>
                    {t('profile.email')}
                    {user?.email}
                </div>
                <div>
                    {t('profile.emailStatus')}
                    {user?.emailConfirmed ?? false ? (
                        <span className="text-success-500">{t('profile.confirmed')}</span>
                    ) : (
                        <span className="text-danger-500">{t('profile.unconfimed')}</span>
                    )}
                </div>
                {user !== undefined && user.role !== 'company' ? (
                    <div>
                        <div>
                            {t('profile.firstName')}
                            {user?.firstName}
                        </div>
                        <div>
                            {t('profile.lastName')}
                            {user?.lastName}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            {t('profile.companyCode')}
                            {user?.companyCode}
                        </div>
                        <div>
                            {t('profile.companyName')}
                            {user?.companyName}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
