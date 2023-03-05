import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { UserLogin } from '../models/User';

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserLogin>();
    const [error, setError] = useState('');
    const { login, loading } = useAuth();

    return (
        <form
            className="flex flex-col items-center justify-center select-none min-h-full bg-bg-primary text-t-primary"
            onSubmit={handleSubmit((data) => {
                setError('');
                login(data).then((error) => setError(error));
            })}>
            <div className="w-[300px] h-[300px] bg-bg-secondary rounded-lg">
                <div className="pt-[20px] text-fs-heading text-center mb-[30px]">Login</div>
                <div className="flex flex-col items-left ml-[30px]">
                    <input
                        type="text"
                        className="w-[220px] bg-bg-secondary border-b-[1px] focus:outline-none"
                        placeholder="Username"
                        {...register('username', { required: true })}
                        disabled={loading}
                    />
                    {errors.username?.type === 'required' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            Username is required
                        </p>
                    ) : (
                        <div className="mb-[30px]"></div>
                    )}
                    <input
                        type="password"
                        className="w-[220px] bg-bg-secondary border-b-[1px] focus:outline-none"
                        placeholder="Password"
                        {...register('password', { required: true })}
                        disabled={loading}
                    />
                    {errors.password?.type === 'required' ? (
                        <p className="mb-[15px] text-[10px] text-[rgb(255,0,0)]">
                            Password is required
                        </p>
                    ) : (
                        <div className="mb-[30px]"></div>
                    )}
                    <label
                        htmlFor="remember"
                        className="text-left text-fs-primary pb-[2px] cursor-pointer">
                        <input
                            id="remember"
                            type="checkbox"
                            className="form-checkbox mr-[10px] w-4 h-4 rounded hover:bg-bg-extra checked:bg-bg-extra bg-bg-secondary focus:ring-0 focus:outline-none"
                            {...register('rememberPassword')}
                            disabled={loading}
                        />
                        Remember Me
                    </label>
                    <br />
                </div>
                <div className="flex flex-col mx-auto items-center">
                    <button
                        className="bg-bg-extra w-[100px] rounded-lg p-1"
                        type="submit"
                        disabled={loading}>
                        Login
                    </button>
                </div>
                {loading && (
                    <div className="flex items-center justify-center pt-16">
                        <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                )}

                <div className="mt-[10px] text-[10px] text-[rgb(255,0,0)] text-center">{error}</div>
            </div>
        </form>
    );
}

export default LoginPage;
