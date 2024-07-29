"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form  } from "@/components/ui/form"
import GlobalForm from "../GlobalForm"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/FormValidation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"





const RegisterForm = ({user}:{user:User}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


// 1. Define your form.
const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
    name: "",
    email: "",
    phone: "",
    },
})

// 2. Define a submit handler.
async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    
    setIsLoading(true)

    
    try {
        const userData = { name, email, phone}; 
        const user = await createUser(userData);

        if (user && user.$id) {
            router.push(`/patients/${user.$id}/register`);
        } else {
            console.error('User ID is missing or invalid');
        }
    } catch (error) {
        console.error('Error on form submit:', error);
    } finally {
        setIsLoading(false); // Ensure loading state is reset
    }
}


    return (
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">

            <section className=" space-y-3 mt-3">
                <h1 className="text-5xl">Welcome <span className="text-indigo-600">!</span></h1>
                <p className="text-sm max-w-[450px]">
                    To ensure we have all the necessary information to provide you with the best care, please
                    fill out the following form with accurate details.<br/>
                    Here’s what we need from you.</p>
            </section>

            <GlobalForm control={form.control} 
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Fullname"
            placeholder="Fullname"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"/>

            <div className="flex gap-6 flex-col md:flex-row">

                    <GlobalForm control={form.control} 
                    fieldType={FormFieldType.INPUT}
                    name="email"
                    label="Email"
                    placeholder="Email"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="Email address"/>

                    <GlobalForm control={form.control} 
                        fieldType={FormFieldType.PHONE_INPUT}
                        name="phone"
                        label="Phone number"
                        placeholder="Phone number"
                        iconAlt="phone number"/>

            </div>

            
        

        <SubmitButton isLoading={isLoading}>Start</SubmitButton>

        

        </form>

    </Form>
    )
}

export default RegisterForm
