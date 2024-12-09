import { Button, Field, Fieldset, Input, Label } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Guest from '@/Layouts/MainLayout';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <Guest>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <Fieldset>
                    <Field>
                        <Label>
                            <span>Email</span>
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        {errors.email && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.email}
                            </div>
                        )}
                    </Field>
                </Fieldset>

                <Fieldset className="mt-4">
                    <Field>
                        <Label>
                            <span>Password</span>
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        {errors.password && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.password}
                            </div>
                        )}
                    </Field>
                </Fieldset>

                <Fieldset className="mt-4">
                    <Field>
                        <Label>
                            <span>Confirm Password</span>
                        </Label>

                        <Input
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />

                        {errors.password_confirmation && (
                            <div className="mt-2 text-sm text-red-600">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </Field>
                </Fieldset>

                <div className="mt-4 flex items-center justify-end">
                    <Button className="ms-4" disabled={processing}>
                        Reset Password
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
