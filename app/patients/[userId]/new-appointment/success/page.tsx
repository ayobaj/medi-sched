import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import Image from "next/image";


const Success = async ({params: {userId}, searchParams}: SearchParamProps) => {

const appointmentId = (searchParams?.appointmentId as string) || " ";
const appointment = await getAppointment(appointmentId);
const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)


    return (
        <div className="flex h-screen max-h-screen px-[5%] justify-center items-center flex-col">

        <div className="text-4xl mb-8">
            <p >Medi-<span className="text-indigo-600">Shed</span></p>
        </div>

            <section className="flex flex-col items-center py-8 gap-12">
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


            <section className="flex gap-3 flex-col">
                <p>Requested Appointment details</p>

                <div className="flex flex-row items-center mx-auto mt-5 gap-3">
                    <div>
                        {doctor?.name!}
                    </div>

                    <div className="">
                    <Image 
                        src={doctor?.image!}
                        alt="doctor"
                        width={100}
                        height={100}
                        className="size-6 rounded-full"
                    />
                </div>

                </div>
            </section>


        </div>
    )
}

export default Success
