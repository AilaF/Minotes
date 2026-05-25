import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/app.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5E6D3' }}>
            <Head title="Register" />

            <div className="w-full max-w-lg">
                {/* Main register card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative transform transition-all duration-500 ease-in-out animate-in slide-in-from-bottom-8 fade-in">
                    {/* Yellow left side panel */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 rounded-l-3xl" style={{ backgroundColor: '#F4D03F' }}></div>
                    
                    {/* Small yellow bookmark in top right */}
                    <div className="absolute top-0 right-8 w-10 h-12 rounded-b-lg" style={{ backgroundColor: '#F4D03F' }}></div>
                    
                    {/* Form content */}
                    <div className="pl-32 pr-8 py-12 relative">
                        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#1a365d' }}>
                            Register
                        </h1>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="w-full px-4 py-4 text-sm bg-gray-100 rounded-2xl border-0 placeholder-gray-600 focus:bg-gray-50 focus:outline-none transition-colors"
                                    placeholder="Full name"
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-4 py-4 text-sm bg-gray-100 rounded-2xl border-0 placeholder-gray-600 focus:bg-gray-50 focus:outline-none transition-colors"
                                    placeholder="Email address"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full px-4 py-4 text-sm bg-gray-100 rounded-2xl border-0 placeholder-gray-600 focus:bg-gray-50 focus:outline-none transition-colors pr-12"
                                        placeholder="Password"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <div className="relative">
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full px-4 py-4 text-sm bg-gray-100 rounded-2xl border-0 placeholder-gray-600 focus:bg-gray-50 focus:outline-none transition-colors pr-12"
                                        placeholder="Confirm password"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    >
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 px-4 text-gray-800 font-semibold rounded-2xl transition-colors focus:outline-none disabled:opacity-50 mt-6"
                                style={{ backgroundColor: '#F4D03F' }}
                            >
                                Register
                            </button>
                        </form>

                        {/* Login link */}
                        <div className="mt-4 text-center">
                            <Link
                                href={route('login')}
                                className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                            >
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}