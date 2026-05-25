import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, router } from '@inertiajs/react'; // Added router import
import '../../../css/app.css';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                // Redirect to notes page
                router.get(route('notes.index'));
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5E6D3' }}>
            <Head title="Log in" />

            <div className="w-full max-w-lg">
                {/* Main login card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative transform transition-all duration-500 ease-in-out animate-in slide-in-from-bottom-8 fade-in">
                    {/* Yellow left side panel */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 rounded-l-3xl" style={{ backgroundColor: '#FFE9AE' }}></div>
                    
                    {/* Small yellow bookmark in top right */}
                    <div className="absolute top-0 right-8 w-10 h-12 rounded-b-lg" style={{ backgroundColor: '#FFE9AE' }}></div>
                    
                    {/* Form content */}
                    <div className="pl-32 pr-8 py-12 relative">
                        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#1a365d' }}>
                            Login
                        </h1>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-8">
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-4 py-4 text-sm bg-gray-100 rounded-2xl border-0 placeholder-gray-600 focus:bg-gray-50 focus:outline-none transition-colors"
                                    placeholder="Email or phone number"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
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
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
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

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-700" style={{ color: '#1a365d' }}>
                                        Remember me
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="hover:underline"
                                        style={{ color: '#1a365d' }}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 px-4 text-gray-800 font-semibold rounded-2xl transition-colors focus:outline-none disabled:opacity-50 mt-10"
                                style={{ backgroundColor: '#FFE9AE' }}
                            >
                                Log in
                            </button>
                        </form>

                        {/* Register link */}
                        <div className="mt-8 text-center">
                            <Link
                                href={route('register')}
                                className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
                            >
                                Don't have an account? Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}