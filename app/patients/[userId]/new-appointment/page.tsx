    import AppointmentForm from "@/components/forms/AppointmentForm"
import PatientForm from "@/components/forms/PatientForm"
import { getPatient } from "@/lib/actions/patient.actions"
    import Image from "next/image"
    import Link from "next/link"




    const NewAppointment = async ({params : {userId}}: SearchParamProps) => {

        const patient = await getPatient(userId);

    return (
        <div className="flex h-screen max-h-screen">

        <section className="remove-scrollbar container my-auto">
            
            <div className="sub-container max-w-[860px]">

            <div className="flex text-xl">
                <span className="text-indigo-600">Medi</span>
                <span className="text-white">-Sched</span>
            </div>

            <AppointmentForm type="create" userId={userId} patientId={patient.$id}/>

                <div className="flex items-center text-14-regular mt-10 justify-between">
                    <p className="justify-items-end text-dark-600 lg:text-left">© {new Date().getFullYear()} Medi-Sched</p>
                </div>

            </div>

        </section>

        <Image src='/assets/images/docapp.jpg'
            alt='appointment'
            className="side-img max-w-[40%] bg-bottom"
            height={1000}
            width={1000}/>

        </div>
    )
    }

export default NewAppointment

