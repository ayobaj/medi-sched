import {DataTable} from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";
import {columns, Payment} from "@/components/table/columns";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";



const Admin = async () => {

    async function getData(): Promise<Payment[]> {
        // Fetch data from your API here.
        return [
            {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
          // ...
        ]
    }

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

    const appointments = await getRecentAppointmentList();



    return (
        <div className="mx-auto flex max-w-6xl flex-col space-y-14">
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

                <section className="admin-start flex w-full gap-6">
                    <StatCard
                        type="appointments"
                        count={appointments.scheduledCount}
                        label="Scheduled appointments"
                        icon="/assets/icons/appointments.svg"
                    />

                    <StatCard
                        type="pending"
                        count={appointments.pendingCount}
                        label="Pending appointments"
                        icon="/assets/icons/pending.svg"
                    />

                    <StatCard
                        type="cancelled"
                        count={appointments.cancelledCount}
                        label="Cancelled appointments"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>

                <DataTable data={appointments.documents} columns={columns}/>
            </main>
        </div>
    )
}

export default Admin
