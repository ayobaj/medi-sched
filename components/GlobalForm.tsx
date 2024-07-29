"use client"


import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css';
import PhoneInput from "react-phone-number-input"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name:string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode

}


const RenderField = ({field, props}: {field:any; props: CustomProps}) => {

const {iconSrc, iconAlt, fieldType, placeholder, showTimeSelect, dateFormat, renderSkeleton} = props;

    switch(props.fieldType){
        case FormFieldType.INPUT: 
        return (
            <div className="flex rounded-lg border">
                {iconSrc && (
                    <Image 
                    src={iconSrc}
                    height={24}
                    width={24}
                    alt={iconAlt || 'icon'}
                    className="ml-2"
                    />
                )}
                <FormControl>
                    <Input placeholder={placeholder} {...field} className="shad-input border-0"/>
                </FormControl>
            </div>
        )

        case FormFieldType.PHONE_INPUT: 
        return (
            <FormControl>
                <PhoneInput
                onChange={field.onChange}
                placeholder = {placeholder}
                className = "input-phone border border-1 border-white"
                international
                withCountryCallingCode
                value={field.value as string | undefined}
                defaultCountry="NG"/>
            </FormControl>
        )

        case FormFieldType.DATE_PICKER : 
        return(
            <div className="flex rounded-md border border-dark-400">
                <Image 
                src="/assets/icons/calendar.svg"
                alt="calendar"
                className="ml-2"
                width={24}
                height={24}
                />
                <FormControl>
                    <DatePicker selected={field.value} 
                    onChange={(date) => field.onChange(date)} 
                    dateFormat={dateFormat ?? 'dd/MM/yyyy'}
                    showTimeSelect={showTimeSelect ?? false}
                    timeInputLabel="Time:"
                    wrapperClassName="date-picker"
                    />
                </FormControl>
            </div>
        )
        
        case FormFieldType.SKELETON : 
        return(
            renderSkeleton ? renderSkeleton(field) : null
        )

        default: break;
    }
}


const GlobalForm = (props: CustomProps) =>  {

    const {control, fieldType, name, label} = props;

    return (
        <FormField  
        control={control}
        name={name}
        render={({ field }) => (
        <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label &&(
                <FormLabel>{label}</FormLabel>
            )}

            <RenderField field={field} props={props}/>

            <FormMessage className="shad-error"/>

        </FormItem> 
        )}
    />
    )
}

export default GlobalForm
