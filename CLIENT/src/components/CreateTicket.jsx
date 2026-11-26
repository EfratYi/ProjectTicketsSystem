import React from 'react'
import { statuses, priorities } from '../constants/ticketOptions.jsx'
export default React.memo(function CreateTicket({ onCreateTicket, onClose, errorMessage }) {
    const [TicetData, setTicketData] = React.useState({
        title: '',
        problemDescription: '',
        status: 'Open',
        priority: 'Low',
    });

    return (
        <div className=" bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-right">
            <h3 className="text-lg font-semibold mb-4"> קריאה חדשה</h3>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
                <span>כותרת: <span className="text-red-500">*</span></span>                <input
                    type="text"
                    required
                    value={TicetData.title}
                    placeholder='כותרת'
                    onChange={(e) => setTicketData((prev) => ({ ...prev, title: e.target.value }))}
                    className="border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:outline-blue-500"
                />
            </label>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
                <span> תיאור הבעיה: <span className="text-red-500">*</span></span>
                <textarea
                    placeholder='תיאור הבעיה'
                    value={TicetData.problemDescription}
                    onChange={(e) => setTicketData((prev) => ({ ...prev, problemDescription: e.target.value }))}
                    className="w-full  flex flex-col gap-2 border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:outline-blue-500"
                    required
                />
            </label>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
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
            <label className="block mb-2 text-sm font-semibold text-gray-700">
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
            {errorMessage && (
                <div className="  text-red-700 px-1 py-3 rounded relative" >
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}
            <div className="flex justify-end gap-3 mt-2 pt-2 ">
                <button
                    onClick={() => onCreateTicket(TicetData)}
                    className="bg-blue-900 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                    יצירת קריאה
                </button>
                <button
                    onClick={onClose}
                    className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    ביטול
                </button>
            </div>
        </div>
    )
}
)