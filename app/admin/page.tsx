import StatCard from "@/components/StatCard";



const Admin = () => {

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
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <header className="admin-header">
                <div className="flex text-xl">
                    <span className="text-indigo-600">Medi</span>
                    <span className="text-white">-Sched</span>
                </div>

                <p className="text-16-semibold">Admin Dashboard</p>
            </header>

            <main className="admin-main">
                <section className="w-full space-y-4">
                    <div className="flex items-center space-x-4 header">
                        <h1 className="">{getTimeOfDayMessage()}</h1>
                        <span>Admin.</span>
                    </div>

                    <p className="text-dark-700">Manage your appointments</p>
                </section>

                <section className="admin-start">
                    <StatCard
                        type="appointments"
                        count={5}
                        label="Scheduled appointments"
                        icon="/assets/icons/appointments.svg"
                    />

                    <StatCard
                        type="pending"
                        count={10}
                        label="Pending appointments"
                        icon="/assets/icons/pending.svg"
                    />

                    <StatCard
                        type="cancelled"
                        count={2}
                        label="Cancelled appointments"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>
            </main>
        </div>
    )
}

export default Admin
