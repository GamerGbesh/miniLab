interface Student {
    title: string;
    headers: string[];
    row: string[][];
}

export default function TableSection({ title, headers, row }: Student) {
    return (
        <section className="p-4">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        {headers.map((header, idx) => (
                            <th
                                key={idx}
                                className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {row.length === 0 ? (
                        <tr>
                            <td
                                colSpan={headers.length}
                                className="px-4 py-4 text-center text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        row.map((data, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition">
                                {data.map((info, id) => (
                                    <td
                                        key={id}
                                        className="px-4 py-3 text-sm text-gray-700"
                                    >
                                        {info}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
