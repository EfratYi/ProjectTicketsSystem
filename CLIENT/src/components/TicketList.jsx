import { useEffect, useState } from 'react'
import { getTickets, updateTicketStatus, deleteTicket, createTicket } from '../services/api.js'
import TicketRow from '../pages/TicketRow.jsx'
import CreateTicket from './CreateTicket.jsx'
import { statuses } from '../constants/ticketOptions.jsx'
export default function TicketList() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [filterStatus, setFilterStatus] = useState('')
    const [searchTitle, setSearchTitle] = useState('')
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getTickets(filterStatus, '', searchTitle);
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [filterStatus, searchTitle]);


    const handleStatusChange = async (ticketId, newStatus) => {
        try {
            const response = await updateTicketStatus(ticketId, newStatus);
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
                )
            );
        } catch (error) {
            console.error('Error updating ticket status:', error);
            alert('לא ניתן היה לעדכן את הסטטוס בשרת');
        }
    }
    const handleDeleteTicket = async (ticketId) => {
        try {
            await deleteTicket(ticketId);
            setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
            alert('לא ניתן למחוק את הקריאת שירות  ');
        }
    };
    const handleCreateTicket = async (newTicket) => {
        setError("");
        try {
            const response = await createTicket(newTicket);
            setTickets((prevTickets) => [...prevTickets, response.data]);
            setIsCreateOpen(false);
        }

        catch (error) {
            console.error('Error creating ticket:', error);
            const serverError = error.response?.data?.message || error.response?.data || 'לא ניתן ליצור קריאת תמיכה ';
            setError(serverError);
        }

    }

    if (loading) return <p className="text-blue-600 font-medium">טוען נתונים...</p>;
    return (
        <div>

            <div className="mt-8 overflow-x-auto">
                <button className="border rounded-md py-1 px-2 focus:outline-none bg-blue-300 hover:bg-blue-500 " onClick={() => setIsCreateOpen(true)}>
                    צור קריאה חדשה
                </button>
                {isCreateOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs z-50">
                        <CreateTicket handleSubmit={handleCreateTicket} handleClose={() => { setError(""); setIsCreateOpen(false); }} errorMessage={error} clearError={() => setError("")}/>
                    </div>
                )}
            </div>
            <label className="flex justify-start gap-3 mt-6 pt-3 ">
                <input
                    type="text"
                    placeholder="חפש לפי כותרת..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className=" border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className=" border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">כל הסטטוסים</option>
                    {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </select>
            </label>

            {tickets.length === 0 ? (
                <p className="text-gray-600 mt-4">אין קריאות שירות להצגה.</p>
            ) : (


                <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
                    <thead>
                        <tr className="bg-slate-50 border-b text-slate-600 text-sm">
                            <th className="px-6 py-2">כותרת</th>
                            <th className="px-6 py-2">תיאור הבעיה</th>
                            <th className="px-6 py-2">סטטוס</th>
                            <th className="px-6 py-2">דחיפות</th>
                            <th className="px-6 py-2">תאריך יצירה</th>
                            <th className="px-6 py-2">פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <TicketRow key={ticket.id} ticket={ticket} onStatusChange={handleStatusChange} onDelete={handleDeleteTicket} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
