"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form  } from "@/components/ui/form"
import GlobalForm from "../GlobalForm"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import {  getAppointmentSchema } from "@/lib/FormValidation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createAppointment } from "@/lib/actions/appointment.actions"



const AppointmentForm = ({userId, patientId, type}: {userId: string; patientId: string; type: "create" | "cancel" | "schedule"}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const AppointmentFormValidation = getAppointmentSchema(type)


// 1. Define your form.
const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
        primaryPhysician: "",
        schedule: new Date(),
        reason: "",
        note: "",
        cancellationReason: ""
    },
})

// 2. Define a submit handler.
async function onSubmit(values : z.infer<typeof AppointmentFormValidation>) {
    
    setIsLoading(true)

    let status;

    switch (type) {
        case 'schedule':
            status = 'scheduled';
            break;
        case 'cancel':
            status = 'cancelled';
            break;
        default:
            status = 'pending';
            break;
    }

    
    try {
        if(type === 'create' && patientId){
            const appointmentData = {
                userId,
                patient: patientId,
                primaryPhysician: values.primaryPhysician,
                schedule: new Date(values.schedule),
                reason: values.reason!,
                note: values.note,
                status: status as Status,
            }
            const appointment = await createAppointment(appointmentData);

            if(appointment){
                form.reset();
                router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.id}`)
            }
        }

        


    } catch (error) {
        console.error('Error on form submit:', error);
    } finally {
        setIsLoading(false); // Ensure loading state is reset
    }
}



    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'cancel Appointment'
            break;
        case 'create':
            buttonLabel = 'Create Appointment'
            break;
        case 'schedule':
            buttonLabel = 'Schedule Appointment';
            break
    
        default:
            break;
    }


    return (
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

            <section className="mb-12 space-y-4 mt-3">
                <h1 className="text-5xl">New Appointment</h1>
                <p>Request a new appointment</p>
            </section>

            { type  !== "cancel" && (
                <>
                    

                    {/* SELECT A PHYSICIAN */}
                    <GlobalForm control={form.control} 
                    fieldType={FormFieldType.SELECT}
                    name="primaryPhysician"
                    label="Doctor or Physician"
                    placeholder="Select a doctor or Physician"
                    >
                    {Doctors.map((doctor) => (
                        <SelectItem key = {doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2 ">
                                <Image
                                src={doctor.image}
                                width={32}
                                height={32}
                                alt={doctor.name}
                                className="rounded-full border border-dark-500"
                                />
                                <p>{doctor.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                    </GlobalForm>

                    <GlobalForm fieldType={FormFieldType.DATE_PICKER} 
                        control={form.control}
                        name="schedule"
                        label="Select appointment date and time"
                        showTimeSelect
                        dateFormat="dd/ MM /yyy - h:mm aa"
                    >
                    </GlobalForm>

                    <div>

                        <GlobalForm fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="reason"
                            label="Reason for appointment"
                            placeholder="Type in reason for appointment"
                        />

                        <GlobalForm fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="note"
                            label="Notes"
                            placeholder="Type in Notes"
                        />

                    </div>
                    </>
            )}

            {type === "cancel" && (
                <>
                    <GlobalForm
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Type in reason for cancellation"
                    />
                </>
            )}


        <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? 'shad-danger-btn' : 'bg-indigo-600'}`} >{buttonLabel}</SubmitButton>

        

        </form>

    </Form>
    )
}

export default AppointmentForm
