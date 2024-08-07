"use client"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./button";
import AppointmentForm from "../forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

const AppointmentModal = ({type, patientId, userId, appointment} : { type: 'schedule' | 'cancel', patientId: string, userId: string, appointment?:Appointment }) => {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={`capitalize ${type === 'schedule' && 'text-indigo-600' }`}>
                    {type}
                </Button>
            </DialogTrigger>

            <DialogContent className="shad-dialog justify-center items-center mx-auto max-w-[400px] md:max-w-lg">
            <DialogHeader className=" space-y-3">
                <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
                <DialogDescription>
                    Fill in the following details to {type} the appointment
                </DialogDescription>
            </DialogHeader>
                <AppointmentForm 
                    userId={userId}
                    patientId={patientId}
                    type={type}
                    appointment={appointment}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>

    )
}

export default AppointmentModal
