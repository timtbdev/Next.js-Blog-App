'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 as SpinnerIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
import { contactFormSchema } from '@/lib/validations';
import { contactConfig } from '@/config/contact';

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: Partial<ContactFormValues> = {
    name: '',
    email: '',
    message: '',
};

const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues,
    });

    async function onSubmit(data: ContactFormValues) {
        try {
            setIsLoading(true);
            // Send email using Nodemailer
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                }),
            });
            setIsLoading(false);
            form.reset();

            if (!response?.ok) {
                return toast.error(contactConfig.error);
            }
        } catch (error) {
            // Handle error
            console.error(contactConfig.error, error);
        } finally {
            setIsLoading(false);
            toast.success(contactConfig.emailSent);
        }
    }
    return (
        <>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact us</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Aute magna irure deserunt veniam aliqua magna enim voluptate.
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto my-10 space-y-4 text-center">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-600">{contactConfig.name}</FormLabel>
                                <div className="mx-auto flex w-full max-w-md space-x-2">
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-600">{contactConfig.email}</FormLabel>
                                <div className="mx-auto flex w-full max-w-md space-x-2">
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-600">{contactConfig.message}</FormLabel>
                                <div className="mx-auto flex w-full max-w-md space-x-2 bg-white">
                                    <FormControl>
                                        <Textarea className="resize-none" {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className=" w-full max-w-sm items-center justify-center rounded-lg bg-gray-600 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 px-3 py-2 text-sm text-gray-500 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
                    >
                        {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
                        {contactConfig.send}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ContactForm;
