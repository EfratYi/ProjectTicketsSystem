import { useState, memo } from 'react'
import { statuses, priorities } from '../constants/ticketOptions.jsx'
export default memo(function TicketRow({ ticket, onStatusChange, onDelete }) {
    const formattedDate = new Date(ticket.createdAt)
    const [cancelDelete, setCancelDelete] = useState(false);
    return (
        <>
            {cancelDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <p className="mb-4">האם אתה בטוח שברצונך למחוק את קריאת השירות הזו?</p>
                        <div className="flex justify-end gap-2">
                            <button className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setCancelDelete(false)}>
                                ביטול
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                                onDelete(ticket.id);
                                setCancelDelete(false);
                            }}>
                                מחיקה
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <tr className="hover:bg-gray-100">
                <td className="px-6 py-3">{ticket.title}</td>
                <td className="px-6 py-3 align-top">
                    <div dir="ltr" className="max-h-[12vh] overflow-y-auto pr-2">
                        <div dir="rtl" className="whitespace-pre-wrap break-words text-sm leading-relaxed text-right">
                            {ticket.problemDescription}
                        </div>
                    </div>
                </td>
                {/* <td className="max-h-[12vh] overflow-y-auto whitespace-pre-wrap break-words text-sm leading-relaxed pl-2">
                    {ticket.problemDescription}
                </td> */}
                <td className="px-6 py-3">
                    <select value={ticket.status} onChange={(e) => onStatusChange(ticket.id, e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {statuses.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </td>
                <td className="px-6 py-3">{priorities.find((p) => p.value === ticket.priority)?.label || ticket.priority}</td>
                <td className="px-6 py-3">{formattedDate.toLocaleString()}</td>
                <td>
                    <button className="text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded border border-rose-200 transition ml-2" onClick={() => { setCancelDelete(true) }}>
                        🗑️
                    </button>
                </td>
            </tr>
        </>
    )
}
)