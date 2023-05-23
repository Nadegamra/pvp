import { useTranslation } from 'react-i18next'

function ContactInfoPage() {
    const { t } = useTranslation()
    return (
        <div>
            <div className="font-bold p-5 text-[30px]">{t('contacts.contactInfo')}</div>
            <div className="flex flex-col lg:flex-row">
                <div className="mx-auto lg:mx-5 my-5 p-10 w-max h-max bg-bg-secondary rounded-lg">
                    <span className="material-symbols-outlined align-middle pr-3 text-[70px] w-full text-center">
                        article
                    </span>
                    <div className="text-fs-heading">{t('contacts.businessInfo')}</div>
                    <div className="text-fs-primary">MB „Įrenginių pernuomavimas”</div>
                    <div className="text-fs-primary">{t('contacts.companyCode')}300030000 </div>
                    <div className="text-fs-primary">{t('contacts.VATCode')}LT123456789 </div>
                    <div className="text-fs-primary">
                        {t('contacts.address')}Studentų g. 40, Kaunas
                    </div>
                    <div className="text-fs-primary">{t('contacts.email')}info@nuoma.lt</div>
                    <div className="text-fs-primary">{t('contacts.phone')}+370 6 123 4567 </div>
                    <div className="text-fs-primary">{t('contacts.fax')}+370 5 123 4567</div>
                </div>
                <div className="mx-auto lg:mx-5 my-5 p-10 w-max h-max bg-bg-secondary rounded-lg">
                    <span className="material-symbols-outlined align-middle pr-3 text-[70px] w-full text-center">
                        schedule
                    </span>
                    <div className="text-fs-heading">{t('contacts.businessHours1')}</div>
                    <div className="text-fs-primary">{t('contacts.businessHours2')}</div>
                    <div className="text-fs-primary">{t('contacts.businessHours3')}</div>
                </div>
                <div className="mx-auto lg:mx-5 my-5 p-10 w-max h-max bg-bg-secondary rounded-lg">
                    <span className="material-symbols-outlined align-middle pr-3 text-[70px] w-full text-center">
                        mail
                    </span>
                    <div className="text-fs-heading">{t('contacts.contactUs')}</div>
                    <div className="text-fs-primary">{t('contacts.information')}info@nuoma.lt</div>
                    <div className="text-fs-primary">
                        {t('contacts.collaborationProposals')}bend@nuoma.lt
                    </div>
                    <div className="text-fs-primary">
                        {t('contacts.customerService')}support@nuoma.lt
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactInfoPage
