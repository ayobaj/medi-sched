import PatientForm from "@/components/forms/PatientForm"
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image"
import Link from "next/link"




const Home = ({searchParams}: SearchParamProps) => {

  const isAdmin = searchParams.admin === 'true';

  const getTimeOfDayMessage = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
        return "Good Morning!";
    } else if (hours < 18) {
        return "Good Afternoon!";
    } else {
        return "Good Evening!";
    }
};



  return (
    <div className="flex h-screen max-h-screen">

      {isAdmin && <PasskeyModal/>}

      <section className="remove-scrollbar container">
        
        <div className="sub-container max-w-[496px] flex-1 flex-col">

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
        className="side-img max-w-[50%] object-cover"
        height={1000}
        width={1000}/>

    </div>
  )
}

export default Home

