'use client'


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"



const PasskeyModal = () => {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const closeModal = () => {
        setOpen(false);
        router.push('/');
    }
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState();
    const validatePasskey = (e) => {

    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="shad-alert-dialog rounded-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center justify-center">Admin Access Verification
                    </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    To access the admin page. Enter the passkey. 
                </AlertDialogDescription>
                </AlertDialogHeader>

                    <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className="shad-otp">
                            <InputOTPSlot index={0} className="shad-otp-slot"/>
                            <InputOTPSlot index={1} className="shad-otp-slot"/>
                            <InputOTPSlot index={2} className="shad-otp-slot"/>
                            <InputOTPSlot index={3} className="shad-otp-slot"/>
                            <InputOTPSlot index={4} className="shad-otp-slot"/>
                            <InputOTPSlot index={5} className="shad-otp-slot"/>
                        </InputOTPGroup>
                        </InputOTP>

                        {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
                    </div>


                <AlertDialogFooter>
                <div className="flex flex-col w-full gap-3">
                <AlertDialogCancel onClick={()=> closeModal()}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={(e) => validatePasskey(e)} className="bg-indigo-600 w-full">Enter Admin Passkey</AlertDialogAction>
                </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default PasskeyModal
