import React from 'react'
import { statuses, priorities } from '../constants/ticketOptions.jsx'
export default React.memo(
    function TicketFilters({ filters, onSetFilters, searchTitle, onSetSearchTitle }) {
        const selectFilters = [
            { name: "status", defaultlabel: 'כל הסטטוסים', options: statuses },
            { name: "priority", defaultlabel: 'כל הדחיפויות', options: priorities },
        ]
        return (
            <div className="flex justify-start gap-3 mt-6 pt-3 ">
                <div className="flex items-center mr-2 w-60 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 transition">
                    <span className="text-gray-400 text-sm ml-2 select-none">🔍</span>
                    <input
                        type="text"
                        placeholder=" חפש לפי כותרת..."
                        value={searchTitle}
                        onChange={(e) => onSetSearchTitle(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-700 focus:outline-none"

                    />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">סנן לפי...</span>
                    {selectFilters.map((filter) => (
                        <select
                            key={filter.name}
                            value={filters[filter.name]}
                            onChange={(e) => onSetFilters({ ...filters, [filter.name]: e.target.value })}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg py-2 px-3.5 shadow-sm hover:bg-white hover:border-gray-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition cursor-pointer"

                        >
                            <option value=""> {filter.defaultlabel}</option>
                            {filter.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>
            </div>
        )
    }
)
