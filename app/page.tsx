import PatientForm from "@/components/forms/PatientForm"
import Image from "next/image"
import Link from "next/link"




const Home = () => {
  return (
    <div className="flex h-screen max-h-screen">

      {/* otp verification*/}

      <section className="remove-scrollbar container my-auto">
        
        <div className="sub-container max-w-[496px]">

          <div className="flex text-xl">
            <span className="text-indigo-600">Medi</span>
            <span className="text-white">-Sched</span>
          </div>

          <PatientForm/>

          <div className="flex items-center text-14-regular mt-10 justify-between">
            <p className="justify-items-end text-dark-600 lg:text-left">© {new Date().getFullYear()} Medi-Sched</p>
            <Link href='/?admin=true' className="text-indigo-600">
              Admin
            </Link>
          </div>

        </div>

      </section>

      <Image src='/assets/images/frm.jpeg'
        alt='patient'
        className="side-img max-w-[50%]"
        height={1000}
        width={1000}/>

    </div>
  )
}

export default Home

