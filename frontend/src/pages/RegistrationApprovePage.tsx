import { RegisterRequest, RegisterRequestApproval } from '../models/User'
import { useState, useEffect } from 'react'
import { approveRegistrationRequest, getRegisterRequests } from '../api/AuthApi'

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
        <div className="p-5">
            {requests.map((request: RegisterRequest) => (
                <div
                    className="border p-3 m-3 rounded-lg bg-bg-tertiary w-[300px]"
                    key={request.id}>
                    <p>Company email: {request.email}</p>
                    <p>Company name: {request.companyName}</p>
                    <p>Company code: {request.companyCode}</p>
                    <button
                        className="border p-2 rounded-lg bg-bg-extra mr-5"
                        onClick={() => handleApprove(request.id, true)}>
                        Approve
                    </button>
                    <button
                        className="border p-2 rounded-lg bg-bg-extra"
                        onClick={() => handleApprove(request.id, false)}>
                        Reject
                    </button>
                </div>
            ))}
        </div>
    )
}
