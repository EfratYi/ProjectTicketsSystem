import { useEffect, useState, useCallback } from 'react'
import { useDebounce } from '../hook/useDebounce.jsx'
import { getTickets, updateTicketStatus, deleteTicket, createTicket } from '../services/api.js'
import TicketRow from  './TicketRow.jsx'
import CreateTicket from '../components/CreateTicket.jsx'
import TicketFilters from '../components/TicketFilters.jsx'
import TicketTable from '../components/TicketTable.jsx'
export default function TicketsPage() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [searchTitle, setSearchTitle] = useState('')
    const [error, setError] = useState("");
    const debouncedText = useDebounce(searchTitle, 1000);
    const [pageErrors, setPageErrors] = useState("")

    const [filters, setFilters] = useState({
        status: '',
        // priority: '',
    });

    useEffect(() => {
        const fetchTickets = async () => {
            setPageErrors("")
            try {
                const response = await getTickets(filters, debouncedText);
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                const pageError = Object.values(error.response?.data?.errors || {}).flat()[0] || 'בעיה בטעינת הנתונים  ';
                setPageErrors(pageError)
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
            console.log(",aucv",{response})
            setIsCreateOpen(false);
        }

        catch (error) {
            console.error('Error deleting ticket:', error);
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
                        <CreateTicket onCreateTicket={handleCreateTicket} onClose={() => { setError(""); setIsCreateOpen(false); }} errorMessage={error}  />
                    </div>
                )}
            </div>
            <TicketFilters filters={filters} onSetFilters={setFilters} searchTitle={searchTitle} onSetSearchTitle={setSearchTitle} />
            {pageErrors ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-4 relative">
                    <span className="block sm:inline">{pageErrors}</span>
                </div>
            ) : <div>
                {tickets.length === 0 ? (
                    <p className="text-gray-600 mt-4">אין קריאות שירות להצגה.</p>
                ) : (
                    <div className="mt-4 h-[65vh] overflow-auto border border-gray-300 rounded-lg shadow-md bg-white">
                        <TicketTable>

                            {tickets.map((ticket) => (
                                <TicketRow key={ticket.id} ticket={ticket} onStatusChange={handleStatusChange} onDelete={handleDeleteTicket} />
                            ))}

                        </TicketTable>
                    </div>
                )}
            </div>
            }
        </div>
    );
}
