import { useAuth } from '../contexts/AuthContext';
import { CustomerRegister, UserRole } from '../models/User';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface UserRegisterPlus {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailConfirmed: string;
    password: string;
    passwordConfirmed: string;
}

export default function CustomerRegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRegisterPlus>();
    const onSubmit: SubmitHandler<UserRegisterPlus> = () => {
        auth.register(
            new CustomerRegister(
                watch('email'),
                watch('firstName'),
                watch('lastName'),
                watch('email'),
                watch('password')
            ),
            UserRole.customer
        ).then((response) => setError(response));
    };
    const [error, setError] = useState('');
    const auth = useAuth();
    return (
        <form
            className="flex flex-col items-center select-none bg-bg-primary text-t-primary pt-10"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-80 bg-bg-secondary pb-5 rounded">
                <div className="py-6 text-fs-heading text-center">Register</div>
                <div className="mx-[30px]">
                    <input
                        type="firstName"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder="First name"
                        {...register('firstName', { required: true })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-secondary text-danger-500 h-3">
                        {errors.firstName?.type === 'required' ? 'First name is required' : ''}
                    </p>

                    <input
                        type="lastName"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder="Last name"
                        {...register('lastName', { required: true })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-secondary text-danger-500 h-3">
                        {errors.lastName?.type === 'required' ? 'Last name is required' : ''}
                    </p>

                    <input
                        type="email"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder="Email"
                        {...register('email', { required: true })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-secondary text-danger-500 h-3">
                        {errors.email?.type === 'required' ? 'Email is required' : ''}
                    </p>

                    <input
                        type="password"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder="Password"
                        {...register('password', { required: true })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-secondary text-danger-500 h-3">
                        {errors.password?.type === 'required' ? 'Password is required' : ''}
                    </p>

                    <input
                        type="password"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder="Repeat Password"
                        {...register('passwordConfirmed', {
                            required: true,
                            validate: (passwordConfirmed: string) => {
                                if (watch('password') != passwordConfirmed) {
                                    return 'match';
                                }
                            }
                        })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-secondary text-danger-500 h-3">
                        {errors.passwordConfirmed?.type === 'required'
                            ? 'Repeating the password is required'
                            : errors.passwordConfirmed?.type === 'validate'
                            ? 'Passwords do not match'
                            : ''}
                    </p>
                </div>
                <div className="flex flex-col items-center pt-3">
                    <button
                        type="submit"
                        className="bg-bg-extra py-1 px-7 rounded"
                        disabled={auth.loading}>
                        Register
                    </button>
                </div>
            </div>
            <div className="pt-4 text-fs-secondary text-danger-500 text-center">{error}</div>
            {auth.loading && (
                <div className="flex items-center justify-center pt-10">
                    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    );
}
