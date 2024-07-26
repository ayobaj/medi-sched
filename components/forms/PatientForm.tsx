"use client"

//browser key word interactions and some event have to be fired.

import { z } from "zod"

const formSchema = z.object({
    username: z.string().min(2).max(50),
})
 

const PatientForm = () => {
    return (
        <div>
            PAtientForm
        </div>
    )
}

export default PatientForm
