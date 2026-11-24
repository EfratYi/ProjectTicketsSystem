import React from 'react'
import { statuses, priorities } from '../constants/ticketOptions.jsx'
export default function CreateTicket({ handleSubmit, handleClose }) {
    const [TicetData, setTicketData] = React.useState({
        title: '',
        problemDescription: '',
        status: 'Open',
        priority: 'Low',
    });

    return (
        //    <div className="bg-white p-5 rounded-xl shadow-md border border-slate-100">
        <div className="• bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-right">

            <label className="block mb-2">
                כותרת:
                <input
                    type="text"
                    value={TicetData.title}
                    placeholder='כותרת'
                    onChange={(e) => setTicketData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-1/2 border p-2 rounded text-sm focus:outline-blue-500"
                />
            </label>
            <label className="block mb-2">
                תיאור הבעיה:
                <textarea
                    placeholder='תיאור הבעיה'
                    value={TicetData.problemDescription}
                    onChange={(e) => setTicketData((prev) => ({ ...prev, problemDescription: e.target.value }))}
                    className="border p-2 border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </label>
            <label className="block mb-2">
                סטטוס:
                <select onChange={(e) => setTicketData((prev) => ({ ...prev, status: e.target.value }))} className="w-1/2 border p-2 rounded text-sm focus:outline-blue-500"
                >
                    {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </select>
            </label>
            <label className="block mb-2">
                עדיפות:
                <select onChange={(e) => setTicketData((prev) => ({ ...prev, priority: e.target.value }))} className="w-1/2 border p-2 rounded text-sm focus:outline-blue-500"
                >
                    {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value}>
                            {priority.label}
                        </option>
                    ))}
                </select>
            </label>
            <div className="flex justify-end gap-3 mt-6 pt-3 border-t">
                <button
                    onClick={() => handleSubmit(TicetData)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    יצירת קריאה
                </button>
                <button
                    onClick={handleClose}
                    className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    ביטול
                </button>
            </div>
        </div>
        // </div>
    )
}

