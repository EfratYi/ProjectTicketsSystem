import React from 'react'
import { statuses } from '../constants/ticketOptions.jsx'
export default function TicketRow({ ticket , onStatusChange}) {
    const formattedDate = new Date(ticket.createdAt)
  return (
     <tr className="hover:bg-gray-100">
        <td className="px-6 py-3">{ticket.title}</td>
        <td className="px-6 py-3">{ticket.problemDescription}</td>
        <td className="px-6 py-3"> <select value={ticket.status} onChange={(e) => onStatusChange(ticket.id, e.target.value)}  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select></td>
        <td className="px-6 py-3">{ticket.priority}</td>
        <td className="px-6 py-3">{formattedDate.toLocaleDateString()}</td>
        <td>
          <button className="text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded border border-rose-200 transition ml-2" > 🗑️</button>
        </td>
      </tr>
  )
}
