import { useEffect, useState, useCallback } from 'react'
import { useDebounce } from '../hook/useDebounce.jsx'
import { getTickets, updateTicketStatus, deleteTicket, createTicket } from '../services/api.js'
import TicketRow from '../pages/TicketRow.jsx'
import CreateTicket from './CreateTicket.jsx'
import TicketFilters from './TicketFilters.jsx'
export default function TicketList() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [searchTitle, setSearchTitle] = useState('')
    const [error, setError] = useState("");
    const debouncedText = useDebounce(searchTitle, 1000);

    const [filters, setFilters] = useState({
        status: '',
        priority: '',
    });

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await getTickets(filters.status, filters.priority, debouncedText);
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [filters, debouncedText]);


    const handleStatusChange = useCallback(async (ticketId, newStatus) => {
        try {
            await updateTicketStatus(ticketId, newStatus);
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                    ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
                )
            );
        } catch (error) {
            console.error('Error updating ticket status:', error);
            alert('לא ניתן היה לעדכן את הסטטוס בשרת');
        }
    }, []);
    const handleDeleteTicket = useCallback(async (ticketId) => {
        try {
            await deleteTicket(ticketId);
            setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
        } catch (error) {
            console.error('Error deleting ticket:', error);
            alert('לא ניתן למחוק את הקריאת שירות  ');
        }
    }, []);
    const handleCreateTicket = useCallback(async (newTicket) => {
        setError("");
        try {
            const response = await createTicket(newTicket);
            setTickets((prevTickets) => [...prevTickets, response.data].filter((ticket) => {
                const isMismatch = Object.entries(filters).some(([key, value]) => {
                    if (value && ticket[key] != value) {
                        return true;
                    }
                });
                const isSearchMismatch = debouncedText && !ticket.title.includes(debouncedText);
                return !isMismatch && !isSearchMismatch;
            }));
            setIsCreateOpen(false);
        }

        catch (error) {
            const serverError = Object.values(error.response?.data?.errors || {}).flat()[0] || 'לא ניתן ליצור קריאת תמיכה ';
            setError(serverError);
        }

    }, [filters, debouncedText]);

    if (loading) return <p className="text-blue-600 font-medium">טוען נתונים...</p>;
    return (
        <div>

            <div className="mt-8 overflow-x-auto">
                <button className="border rounded-md py-1 px-2 focus:outline-none bg-blue-300 hover:bg-blue-500 " onClick={() => setIsCreateOpen(true)}>
                    צור קריאה חדשה
                </button>
                {isCreateOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs z-50">
                        <CreateTicket onCreateTicket={handleCreateTicket} onClose={() => { setError(""); setIsCreateOpen(false); }} errorMessage={error} clearError={() => setError("")} />
                    </div>
                )}
            </div>
            <TicketFilters filters={filters} onSetFilters={setFilters} searchTitle={searchTitle} onSetSearchTitle={setSearchTitle} />
            {tickets.length === 0 ? (
                <p className="text-gray-600 mt-4">אין קריאות שירות להצגה.</p>
            ) : (
                <div className="mt-4 h-[65vh] overflow-auto border border-gray-300 rounded-lg shadow-md bg-white">
                <table className="w-full  border  border-gray-300 rounded-lg overflow-hidden shadow-md">
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
                </div>
            )}
        </div>
    );
}
