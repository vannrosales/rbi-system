import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-blue-100 selection:text-blue-700">
            <Head title="Staff Login - RBI B3" />

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative w-full max-w-[450px]">
                {/* Logo / Branding */}
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-200 rotate-3 transition-transform hover:rotate-0">
                            <span className="text-white font-black text-2xl">B3</span>
                        </div>
                    </Link>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Staff Portal</h1>
                    <p className="text-slate-500 text-sm mt-1">Registry of Barangay Inhabitants</p>
                </div>

                {/* Login Card */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
                    {status && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl text-sm font-medium text-green-600 animate-fade-in">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <InputLabel htmlFor="email" value="Official Email" className="text-slate-700 ml-1 mb-1.5" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all px-4 py-3"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="name@barangay3.gov"
                            />
                            <InputError message={errors.email} className="mt-2 ml-1" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <InputLabel htmlFor="password" value="Password" className="text-slate-700 ml-1" />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                                    >
                                        Forgot?
                                    </Link>
                                )}
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all px-4 py-3"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password} className="mt-2 ml-1" />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center ml-1">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                            />
                            <span className="ms-2 text-sm font-medium text-slate-500">
                                Keep me logged in
                            </span>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <PrimaryButton
                                className="w-full justify-center py-4 rounded-2xl bg-slate-900 hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-200"
                                disabled={processing}
                            >
                                {processing ? 'Authenticating...' : 'Sign In'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                {/* Footer Link */}
                <p className="text-center mt-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Authorized Personnel Only
                </p>
            </div>
        </div>
    );
}
