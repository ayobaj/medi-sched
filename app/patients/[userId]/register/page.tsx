import Image from "next/image"
import Link from "next/link"


const Register = () => {
return (
    <div className="flex h-screen max-h-screen">

    {/* otp verification*/}

    <section className="remove-scrollbar container my-auto">
    
        <div className="sub-container max-w-[496px]">

            <div className="flex text-xl">
                <span className="text-indigo-600">Medi</span>
                <span className="text-white">-Sched</span>
            </div>

            <section className="mb-12 space-y-4 mt-3">
                <h1 className="text-5xl">Welcome <span className="text-indigo-600">!</span></h1>
                <p>Schedule your appointment with a specialist</p>
            </section>

            {/* <PatientForm/> */}

            <div className="flex items-center text-14-regular mt-10 justify-between">
                <p className="justify-items-end text-dark-600 lg:text-left">© {new Date().getFullYear()} Medi-Sched</p>
                <Link href='/?admin=true' className="text-indigo-600">
                    Admin
                </Link>
            </div>

        </div>

    </section>

    <Image src='/assets/images/register-img.png'
    alt='registration page'
    className="side-img max-w-[390px]"
    height={1000}
    width={1000}/>

    </div>
    )
}

export default Register