import RegisterForm from "@/components/forms/RegisterForm"
import { getUser } from "@/lib/actions/patient.actions"
import Image from "next/image"
import Link from "next/link"


const Register = async ({params: {userId}}: SearchParamProps ) => {

    const user = await getUser(userId)

return (
    <div className="flex h-screen max-h-screen">

    <section className="remove-scrollbar container ">
    
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">

            <div className="flex text-xl">
                <span className="text-indigo-600">Medi</span>
                <span className="text-white">-Sched</span>
            </div>

            <RegisterForm user={user}/>

            <div className="flex items-center text-14-regular mt-10 justify-between py-12">
                <p className="justify-items-end text-dark-600 md:text-left">© {new Date().getFullYear()} Medi-Sched</p>
            </div>

        </div>

    </section>

    <Image src='/assets/images/formimage.jpeg'
    alt='registration page'
    className="side-img max-w-[390px] object-cover"
    height={1000}
    width={1000}/>

    </div>
    )
}

export default Register
