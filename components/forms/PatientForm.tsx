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




export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skelton',
}




const PatientForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const getTimeOfDayMessage = () => {
        const now = new Date();
        const hours = now.getHours();
    
        if (hours < 12) {
            return "Good Morning";
        } else if (hours < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };



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

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

            <section className="mb-12 space-y-4 mt-3">
                <h1 className="text-5xl">{getTimeOfDayMessage()} <span className="text-indigo-600">!</span></h1>
                <p>Schedule your appointment with a Dcotor</p>
            </section>

            <GlobalForm control={form.control} 
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Fullname"
            placeholder="Fullname"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"/>
        

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

        <SubmitButton isLoading={isLoading}>Start</SubmitButton>


        </form>

    </Form>
    )
}

export default PatientForm
