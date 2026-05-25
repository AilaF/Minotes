import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Login" />
            <h1>Login</h1>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                />
                <button disabled={processing}>Login</button>
            </form>
            <Link href="/register">Register</Link>
        </>
    );
}
