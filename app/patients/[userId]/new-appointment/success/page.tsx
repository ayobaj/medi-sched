import { Section } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const page = () => {
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


            <section>
                <p>Requested Appointment details</p>

                <div className="flex items-center gap-3">

                </div>
            </section>


        </div>
    )
}

export default page
