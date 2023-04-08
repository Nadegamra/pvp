import { useAuth } from '../contexts/AuthContext';
import { CompanyRegister, UserRole } from '../models/User';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserRegisterPlus {
  username: string;
  companyCode: string;
  companyName: string;
  email: string;
  emailConfirmed: string;
  password: string;
  passwordConfirmed: string;
  status: string;
}

export default function CompanyRegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRegisterPlus>();
    const onSubmit: SubmitHandler<UserRegisterPlus> = async () => {
        try {
        const response = await auth.register(
            new CompanyRegister(
            watch('email'),
            watch('companyCode'),
            watch('companyName'),
            watch('email'),
            watch('password'),
            watch('status')
            ),
            UserRole.company
        );
        if (typeof response === 'string') {
            setError(response);
            setSuccess(true);
        } else {
            throw new Error('Registration failed.');
        }
        } catch (error) {
           // setError(error.message);
        }
    };
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const auth = useAuth();

    const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`admin/companies/requests`).then((response) => {
      setRequests(response.data);
    });
  }, []);

  const handleApprove = (companyId: string) => {
    axios
      .put(`admin/companies/${companyId}`, { status: 'approved' })
      .then(() => {
        // refresh the request list
        axios.get(`admin/companies/requests`).then((response) => {
          setRequests(response.data);
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleReject = (companyId: string) => {
    axios
      .put(`admin/companies/${companyId}`, { status: 'rejected' })
      .then(() => {
        // refresh the request list
        axios.get(`admin/companies/requests`).then((response) => {
          setRequests(response.data);
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      {requests.map((request: any) => (
        <div key={request.companyId}>
          <p>Company name: {request.companyName}</p>
          <p>Company code: {request.companyCode}</p>
          <p>Status: {request.status}</p>
          <button onClick={() => handleApprove(request.companyId)}>Approve</button>
          <button onClick={() => handleReject(request.companyId)}>Reject</button>
        </div>
      ))}
      {auth.loading && (
        <div className="flex items-center justify-center pt-10">
          <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
      {!auth.loading && requests.length === 0 && (
        <p>No company registration requests found.</p>
      )}
    </div>
  );
}
