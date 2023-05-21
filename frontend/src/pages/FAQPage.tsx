import { useTranslation } from 'react-i18next'
import FaqCard from '../components/faq/FaqCard'

function FAQPage() {
    const { t } = useTranslation()
    return (
        <div className="pb-10">
            <div className="text-fs-h1 font-bold m-5">{t('faq.faq')}</div>
            <FaqCard id={1} pos="top" buttonText={t('faq.q1')} content={t('faq.a1')} />
            <FaqCard id={2} pos="middle" buttonText={t('faq.q2')} content={t('faq.a2')} />
            <FaqCard id={3} pos="middle" buttonText={t('faq.q3')} content={t('faq.a3')} />
            <FaqCard id={4} pos="middle" buttonText={t('faq.q4')} content={t('faq.a4')} />
            <FaqCard id={5} pos="middle" buttonText={t('faq.q5')} content={t('faq.a5')} />
            <FaqCard id={6} pos="middle" buttonText={t('faq.q6')} content={t('faq.a6')} />
            <FaqCard id={7} pos="middle" buttonText={t('faq.q7')} content={t('faq.a7')} />
            <FaqCard id={8} pos="middle" buttonText={t('faq.q8')} content={t('faq.a8')} />
            <FaqCard id={9} pos="middle" buttonText={t('faq.q9')} content={t('faq.a9')} />
            <FaqCard id={10} pos="middle" buttonText={t('faq.q10')} content={t('faq.a10')} />
            <FaqCard id={11} pos="bottom" buttonText={t('faq.q11')} content={t('faq.a11')} />
        </div>
    )
}

export default FAQPage
