"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl  } from "@/components/ui/form"
import GlobalForm from "../GlobalForm"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/FormValidation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { FileUploader } from "../ui/FileUploader"





const RegisterForm = ({user}:{user:User}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


// 1. Define your form.
const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
    ...PatientFormDefaultValues,
    name: "",
    email: "",
    phone: "",
    },
})

// 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof PatientFormValidation>) {

    setIsLoading(true);

    let formData;

    if(values.identificationDocument && values.identificationDocument.length > 0){
        //Blob is a special version of file which a document can use
        const blobFile = new Blob([values.identificationDocument[0]], {
            type: values.identificationDocument[0].type,
        })

        formData = new FormData();
        formData.append('blobFile', blobFile);
        formData.append('fileName', values.identificationDocument[0].name)
    }
    
    try {
        
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

            {/*NAME FIELD*/}
            <GlobalForm control={form.control} 
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Fullname"
            placeholder="Fullname"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"/>

            {/*EMAIL AND PHONE NUMBER FIELD*/}
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

            {/*DATE OF BIRTH AND GENDER FIELD*/}
            <div className="flex flex-col gap-6 md:flex-row">
                <GlobalForm control={form.control} 
                    fieldType={FormFieldType.DATE_PICKER}
                    name="birthDate"
                    label="Date of Birth"
                    placeholder="Date of Birth"/>

                <GlobalForm control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    name="gender"
                    label="Gender"
                    placeholder="gender"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <RadioGroup className="flex h-11 gap-6 md:justify-between"
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                                {GenderOptions.map((option) => (
                                    <div key={option} className="radio-group">
                                        <RadioGroupItem value={option} id={option}/>
                                        <Label htmlFor={option} className="cursor-pointer">
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                    />
            </div>

            {/*ADDRESS AND OCCUPATION*/}
            <div className="flex flex-col gap-6 md:flex-row">
                <GlobalForm control={form.control} 
                    fieldType={FormFieldType.INPUT}
                    name="address"
                    label="Address"
                    placeholder="Your Address"
                    />

                <GlobalForm control={form.control} 
                    fieldType={FormFieldType.INPUT}
                    name="occupation"
                    label="Occupation"
                    placeholder="Your Occupation"
                    />
            </div>

            {/*EMERGENCY CONTACT NAME & NUMBER*/}
            <div className="flex flex-col gap-6 md:flex-row">
                <GlobalForm control={form.control} 
                    fieldType={FormFieldType.INPUT}
                    name="emergencyContactName"
                    label="Emergency contact name"
                    placeholder="Emergency contact name"
                    />

                <GlobalForm control={form.control} 
                    fieldType={FormFieldType.PHONE_INPUT}
                    name="emergencyContactNumber"
                    label="Emergency contact number"
                    placeholder="Emergency contact number"
                    iconAlt="phone number"/>
            </div>



            <section className="space-y-6">
                <div className="mb-6 space-y-1">
                    <h2 className="sub-header">
                        Medical Information
                    </h2>
                </div>
            </section>


            {/* SELECT A PHYSICIAN */}
            <GlobalForm control={form.control} 
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Doctor or Physician"
            placeholder="select a doctor or physician"
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

            {/* INSURANCE PROVIDER AND POLICY NUMBER */}
            <div className="flex gap-6 flex-col md:flex-row">
                <GlobalForm control={form.control} 
                        fieldType={FormFieldType.INPUT}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="Insurance Provider"
                    />

                <GlobalForm control={form.control} 
                        fieldType={FormFieldType.INPUT}
                        name="insurancePolicyNumber"
                        label="insurance policy number"
                        placeholder="CBG0099999"
                    />
            </div>

            {/*ALLERGY AND CURRENT MEDICATION*/}
            <div className="flex gap-6 flex-col">
                <GlobalForm control={form.control} 
                        fieldType={FormFieldType.TEXTAREA}
                        name="allergies"
                        label="Allergic Reactions"
                        placeholder="Provide information about substances you react to"
                    />

                <GlobalForm control={form.control} 
                        fieldType={FormFieldType.TEXTAREA}
                        name="currentMedication"
                        label="Current medication(s)"
                        placeholder="Provide the list of your current medication(s)"
                    />
            </div>

             {/* FAMILY MEDICAL HISTORY AND PERSONAL MEDICAL HISTORY */}
            <div className="flex gap-6 flex-col">

                <GlobalForm control={form.control} 
                        fieldType={FormFieldType.TEXTAREA}
                        name="pastMedicalHistory"
                        label="Medical History"
                        placeholder="Provide information about your medical history"
                    />

                <GlobalForm control={form.control} 
                        fieldType={FormFieldType.TEXTAREA}
                        name="familyMedicalHistory"
                        label="Family Medical History"
                        placeholder="Provide information about family medical history"
                    />
            </div>
        

            {/*IDENTITY NUMBER, IDENTITY UPLOAD, IDENTITY TYPE*/}
            <section className="space-y-6">
                <div className="mb-6 space-y-1">
                    <h2 className="sub-header">
                        Identification and Verification
                    </h2>
                </div>
            </section>

            <GlobalForm control={form.control} 
                fieldType={FormFieldType.SELECT}
                name="identificationType"
                label="Identification Type"
                placeholder="Select an identification type"
            >
                {IdentificationTypes.map((idtype) => (
                    <SelectItem key = {idtype} value={idtype}>
                        {idtype}
                    </SelectItem>
                ))}
            </GlobalForm>

            <GlobalForm control={form.control} 
                    fieldType={FormFieldType.INPUT}
                    name="identificationNumber"
                    label="Identification number"
                    placeholder="Provide your identification number for the document selected"
                />

            <GlobalForm control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    name="identificationDocument"
                    label="Identification document"
                    placeholder="Copy of identification document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange} />
                        </FormControl>
                    )}
                    />

            <section className="space-y-6">
                <div className="mb-6 space-y-1">
                    <h2 className="sub-header">
                        Consent and Privacy
                    </h2>
                </div>
            </section>

            {/*CONSENT AND PRIVACY*/}
            <GlobalForm
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="treatmentConsent"
                label="Consent to treatment"
            />

            <GlobalForm
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="disclosureConsent"
                label="Consent to discolure of information"
            />

            <GlobalForm
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="privacyConsent"
                label="Consent to privacy policy"
            />




        <SubmitButton isLoading={isLoading}>Start</SubmitButton>

        

        </form>

    </Form>
    )
}

export default RegisterForm
