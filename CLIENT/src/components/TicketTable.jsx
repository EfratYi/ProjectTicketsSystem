export default function TicketTable({children}) {

    return (
          <table className="w-full  border  border-gray-300 rounded-lg shadow-md">
                    <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm">
                        <tr>
                            <th className="px-6 py-2 whitespace-nowrap">כותרת</th>
                            <th className="px-6 py-2 whitespace-nowrap">תיאור הבעיה</th>
                            <th className="px-6 py-2 whitespace-nowrap">סטטוס</th>
                            <th className="px-6 py-2 whitespace-nowrap">דחיפות</th>
                            <th className="px-6 py-2 whitespace-nowrap">תאריך יצירה</th>
                            <th className="px-6 py-2 whitespace-nowrap">פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                      {children }
                    </tbody>
                </table>
    );
}
