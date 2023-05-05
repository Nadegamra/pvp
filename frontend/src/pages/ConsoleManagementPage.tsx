import { useTranslation } from 'react-i18next'
import ConsoleInfoUpdateForm from '../components/consoleManagement/ConsoleInfoUpdateForm'
import ConsoleImagesUpdateForm from '../components/consoleManagement/ConsoleImagesUpdateForm'

function ConsoleManagementPage() {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col">
            <div className="w-max mx-auto pt-10">
                <div className="pt-6 text-fs-h1">{t('consoleManagementForm.console')}</div>
                <hr className="pb-5" />
                <ConsoleInfoUpdateForm />
            </div>
            <div className="w-max mx-auto">
                <div className="pt-6 text-fs-h1">{t('consoleManagementForm.images')}</div>
                <hr className="pb-5" />
                <ConsoleImagesUpdateForm />
            </div>
        </div>
    )
}

export default ConsoleManagementPage
