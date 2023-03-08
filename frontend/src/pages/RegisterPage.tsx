import { useAuth } from '../contexts/AuthContext';
import { UserRegister } from '../models/User';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface UserRegisterPlus {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailConfirmed: string;
    password: string;
}

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRegisterPlus>();
    const onSubmit: SubmitHandler<UserRegisterPlus> = () => {
        auth.register(
            new UserRegister(watch('username'), watch('firstName'), watch('lastName'), watch('email'), watch('emailConfirmed'), watch('password'))
        ).then((response) => setError(response));
    };
    const [error, setError] = useState('');
    const auth = useAuth();
    return (
        <form
            className="flex flex-col items-center justify-center select-none min-h-full bg-bg-primary text-t-primary"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[300px] h-[500px] bg-bg-secondary rounded-lg">
                <div className="pt-[20px] text-fs-heading text-center mb-[30px]">Register</div>
                <div className="flex flex-col items-left ml-[30px]">
                    <input
                        type="username"
                        className="w-[220px] bg-bg-secondary border-b-[1px] focus:outline-none"
                        placeholder="Username"
                        {...register('username', { required: true })}
                    />
                    {errors.username?.type === 'required' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            Username is required
                        </p>
                    ) : (
                        <div className="mb-[30px]"></div>
                    )}
                    <input
                        type="firstName"
                        className="w-[220px] bg-bg-secondary border-b-[1px] focus:outline-none"
                        placeholder="First name"
                        {...register('firstName', { required: true })}
                    />
                    {errors.firstName?.type === 'required' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            First name is required
                        </p>
                    ) : (
                        <div className="mb-[30px]"></div>
                    )}
                    <input
                        type="lastName"
                        className="w-[220px] bg-bg-secondary border-b-[1px] focus:outline-none"
                        placeholder="Last name"
                        {...register('lastName', { required: true })}
                    />
                    {errors.lastName?.type === 'required' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            Last name is required
                        </p>
                    ) : (
                        <div className="mb-[30px]"></div>
                    )}
                    <input
                        type="email"
                        className="w-[220px] bg-bg-secondary border-b-[1px] focus:outline-none"
                        placeholder="Email"
                        {...register('email', { required: true })}
                    />
                    {errors.email?.type === 'required' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            Email is required
                        </p>
                    ) : (
                        <div className="mb-[30px]"></div>
                    )}
                    <input
                        type="email"
                        className="w-[220px] bg-bg-secondary border-b-[1px] focus:outline-none"
                        placeholder="Repeat Email"
                        {...register('emailConfirmed', {
                            required: true,
                            validate: (emailConfirmed: string) => {
                                if (watch('email') != emailConfirmed) {
                                    return 'match';
                                }
                            }
                        })}
                    />
                    {errors.emailConfirmed?.type === 'required' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            Repeating the email is required
                        </p>
                    ) : errors.emailConfirmed?.type === 'validate' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            Emails do not match
                        </p>
                    ) : (
                        <div className="mb-[30px]"></div>
                    )}
                    <input
                        type="password"
                        className="w-[220px] bg-bg-secondary border-b-[1px] focus:outline-none"
                        placeholder="Password"
                        {...register('password', { required: true })}
                    />
                    {errors.password?.type === 'required' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            Password is required
                        </p>
                    ) : (
                        <div className="mb-[30px]"></div>
                    )}
                <div className="flex flex-col mx-auto items-center">
                    <button type="submit" className="bg-bg-extra w-[100px] rounded-lg p-1">
                        Register
                    </button>
                </div>
                </div>
                <div className="mt-[10px] text-[10px] text-[rgb(255,0,0)] text-center">{error}</div>
            </div>
        </form>
    );
}