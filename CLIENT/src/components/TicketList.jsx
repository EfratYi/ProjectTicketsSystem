import { useEffect,useState } from 'react'
import {getTickets,updateTicketStatus} from '../services/api.js'
import TicketRow from '../pages/TicketRow.jsx'
export default function TicketList() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)    

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
  
    
    const handleStatusChange =async (ticketId, newStatus) => {
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


if (loading) return <p className="text-blue-600 font-medium">טוען נתונים...</p>;
if (tickets.length === 0) return <p className="text-red-600 font-medium">לא נמצאו קריאות שירות</p>;
  return (

    <div class="mt-8 overflow-x-auto">
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
                <TicketRow key={ticket.id} ticket={ticket} onStatusChange={handleStatusChange} />
            ))}
        </tbody>
    </table>
       
    </div>
)

}