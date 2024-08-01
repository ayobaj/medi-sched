import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


const Success = async ({params: {userId}, searchParams}: SearchParamProps) => {

const appointmentId = (searchParams?.appointmentId as string) || " ";
const appointment = await getAppointment(appointmentId);
const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)


    return (
        <div className="flex h-screen max-h-screen px-[5%] justify-center items-center flex-col">

        <div className="text-4xl mb-8">
            <p >Medi-<span className="text-indigo-600">Shed</span></p>
        </div>

            <section className="flex flex-col items-center gap-8">
                <Image 
                    src="/assets/gifs/suc.gif"
                    height={300} 
                    width={200}
                    alt="success"
                    className="rounded-lg"
                />

                <h2 className="header max-w-[600px] text-center">
                    Appointment Request <span className="text-indigo-400">Successful!</span>
                </h2>

                <p>Confirmation will be sent soon.</p>
            </section>


            <section className="flex gap-3 flex-col justify-center items-center py-9">
                <div>Requested Appointment details below</div>

                <div className="flex flex-row items-center mx-auto gap-3">

                    <div className="">
                        <Image
                            src={doctor?.image!}
                            alt="doctor"
                            width={100}
                            height={100}
                            className="size-8 rounded-full"
                        />
                    </div>

                    <div className="whitespace-nowrap bg-slate-600 rounded-md p-2">
                        {`Dr `}{doctor?.name!}
                    </div>

                    <div className="flex gap-">
                        <Image src="/assets/icons/calendar.svg" height={24} width={24} alt="calendar"/>
                        {formatDateTime(appointment.schedule).dateTime}
                    </div>

                </div>
            </section>

            <Button className="bg-indigo-600 mt-5" asChild>
                <Link href={`/patients/${userId}/new-appointment`}>
                    New Appointment
                </Link>
            </Button>

            <p className="mt-8 justify-items-end text-dark-600 lg:text-left">© {new Date().getFullYear()} Medi-Sched</p>


        </div>
    )
}

export default Success
