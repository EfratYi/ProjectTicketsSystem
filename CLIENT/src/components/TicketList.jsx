import { useEffect, useState } from 'react'
import { getTickets, updateTicketStatus, deleteTicket, createTicket } from '../services/api.js'
import TicketRow from '../pages/TicketRow.jsx'
import CreateTicket from './CreateTicket.jsx'
export default function TicketList() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getTickets();
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [])


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
        console.log('Creating ticket:', newTicket);
        try {
            const response = await createTicket(newTicket);
            setTickets((prevTickets) => [...prevTickets, response.data]);
            setIsCreateOpen(false);
        }
        catch (error) {
            console.error('Error creating ticket:', error);
            alert('לא ניתן ליצור קריאת תמיכה  ');
        }

    }

    if (loading) return <p className="text-blue-600 font-medium">טוען נתונים...</p>;
    return (
        <div>
            <div className="mt-8 overflow-x-auto">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsCreateOpen(true)}>
                    צור קריאה חדשה
                </button>
                {isCreateOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-96">
                            <CreateTicket handleSubmit={handleCreateTicket} handleClose={() => setIsCreateOpen(false)} />
                        </div>
                    </div>
                )}
            </div>
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
