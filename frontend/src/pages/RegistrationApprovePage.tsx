import { RegisterRequest, RegisterRequestApproval } from '../models/User'
import { useState, useEffect } from 'react'
import { approveRegistrationRequest, getRegisterRequests } from '../api/AuthApi'
import { t } from 'i18next'
import { getContainerHeight } from '../App'
import Button from '../components/ui/Button'

export default function CompanyRegisterPage() {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        getRegisterRequests().then((response) => {
            setRequests(response.data)
        })
    }, [])

    const handleApprove = (requestId: number, isApproved: boolean) => {
        approveRegistrationRequest(new RegisterRequestApproval(requestId, isApproved)).then(() => {
            // refresh the request list
            getRegisterRequests().then((response) => {
                setRequests(response.data)
            })
        })
    }

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-6"
            style={{
                minHeight: getContainerHeight()
            }}>
            {requests.map((request: RegisterRequest) => (
                <div
                    className="p-3 m-3 rounded-lg bg-bg-secondary w-max h-max mx-auto"
                    key={request.id}>
                    <div className="font-bold">{t('profile.email')}</div>
                    <p className="ml-3">{request.email}</p>
                    <div className="font-bold">{t('profile.companyName')}</div>
                    <p className="ml-3">{request.companyName}</p>
                    <div className="font-bold">{t('profile.companyCode')}</div>
                    <p className="ml-3 mb-5">{request.companyCode}</p>
                    <div className="flex flex-row">
                        <span className="mr-[30px]">
                            <Button
                                text="Approve"
                                onClick={() => handleApprove(request.id, true)}
                            />
                        </span>
                        <span className="ml-auto">
                            <Button
                                text="Reject"
                                onClick={() => handleApprove(request.id, false)}
                            />
                        </span>
                    </div>
                </div>
            ))}
            {requests.length === 0 && (
                <div className="m-auto text-center align-middle w-screen">
                    {t('register.noRequests')}
                </div>
            )}
        </div>
    )
}
