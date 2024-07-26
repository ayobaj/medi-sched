"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form  } from "@/components/ui/form"
import GlobalForm from "../GlobalForm"


export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skelton',
}


const formSchema = z.object({
username: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
}),
})

const PatientForm = () => {
// 1. Define your form.
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    username: "",
    },
})

// 2. Define a submit handler.
function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
}
    return (
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

            <section className="mb-12 space-y-4 mt-3">
                <h1 className="text-5xl">Welcome <span className="text-indigo-600">!</span></h1>
                <p>Schedule your appointment with a specialist</p>
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

        <Button type="submit">Submit</Button>

        

        </form>

    </Form>
    )
}

export default PatientForm
