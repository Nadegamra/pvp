import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import PersonalInfoForm from '../components/profile/PersonalInfoForm'
import CompanyInfoForm from '../components/profile/CompanyInfoForm'
import AddressForm from '../components/profile/AddressForm'
import EmailChangeForm from '../components/profile/EmailChangeForm'
import PasswordChangeForm from '../components/profile/PasswordChangeForm'

function ProfilePage() {
    const { t } = useTranslation()
    const { user } = useAuth()

    return (
        <div className="flex justify-center content-center">
            <div className="w-[45rem] mt-10 rounded-lg p-5 pb-20">
                {user !== undefined && !user.isCompany && (
                    <div>
                        <div className="font-bold text-left text-[25px]">
                            {t('profile.personalInfo')}
                        </div>
                        <hr className="pb-3" />
                        <PersonalInfoForm />
                    </div>
                )}
                {user !== undefined && user.isCompany && (
                    <div>
                        <div className="font-bold text-left text-[25px]">
                            {t('profile.companyInfo')}
                        </div>
                        <hr className="pb-3" />
                        <CompanyInfoForm />
                    </div>
                )}
                <div>
                    <div className="font-bold text-left text-[25px] pt-5">
                        {t('profile.address')}
                    </div>
                    <hr className="pb-2" />
                    <AddressForm />
                </div>
                <div>
                    <div className="font-bold text-left text-[25px] pt-5">{t('profile.email')}</div>
                    <hr className="pb-2" />
                    <EmailChangeForm />
                </div>
                <div>
                    <div className="font-bold text-left text-[25px] pt-5">
                        {t('profile.security')}
                    </div>
                    <hr className="pb-3" />
                    <PasswordChangeForm />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
