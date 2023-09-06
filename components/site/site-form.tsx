'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircleIcon, MailIcon, Loader2 as SpinnerIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { form as siteForm } from '@/config/site';
import { emailSchema } from '@/lib/validation/contact';

const SiteForm = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        },
    });

    async function onSubmit(data: z.infer<typeof emailSchema>) {
        setIsLoading(true);

        const response = await fetch('/api/subscribe/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
            }),
        });

        if (!response?.ok) {
            setIsLoading(false);
            return toast.error(siteForm.error);
        }

        setIsLoading(false);
        toast.success(siteForm.success);
        form.reset();

        return true;
    }

    return (
        <div className="mx-auto mt-10 max-w-3xl flex-col justify-center">
            <div className="relative mx-auto items-center justify-center rounded-xl border border-black/5 p-5 sm:flex-row">
                <div className="text-normal absolute left-2.5 top-0 -translate-y-1/2 bg-white px-2 font-normal text-slate-500">
                    <div className="inline-flex items-center">
                        <MailIcon className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-sm tracking-tight text-gray-400 [word-spacing:-5px]">
                            {siteForm.title}
                        </span>
                    </div>
                </div>
                <div className="flex-row justify-center py-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mx-auto justify-center sm:flex sm:max-w-md lg:mt-0"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="bg-white"
                                                placeholder={siteForm.emailAddress}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-lg bg-gray-600 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 px-3 py-2 text-sm text-gray-500 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
                                >
                                    {isLoading && <SpinnerIcon className="mr-2 h-6 w-6 animate-spin" />}
                                    {siteForm.button}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="mx-auto inline-flex w-full items-center justify-center px-2 text-gray-400">
                    <AlertCircleIcon className="mr-1 h-4 w-4" />
                    <span className="text-sm">{siteForm.warning}</span>
                </div>
            </div>
        </div>
    );
};

export default SiteForm;
