import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default function Index({ auth, inhabitants }) {
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);

    // --- SELECTION LOGIC ---
    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredInhabitants.length && filteredInhabitants.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredInhabitants.map(p => p.id));
        }
    };

    // --- PDF EXPORT LOGIC (Matching Image Format) ---
    const exportToPDF = () => {
        const doc = new jsPDF('landscape', 'mm', 'a4');
        const selectedData = inhabitants.filter(p => selectedIds.includes(p.id));

        if (selectedData.length === 0) return alert("Please select at least one inhabitant.");

        // Title Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("BARANGAY REGISTERED INHABITANTS' CY 2026", 148, 15, { align: "center" });

        // Metadata Bar
        doc.setFontSize(9);
        doc.setLineWidth(0.5);
        doc.line(14, 18, 283, 18); // Top line

        doc.text(`REGION: VIII`, 14, 23);
        doc.text(`PROVINCE: EASTERN SAMAR`, 45, 23);
        doc.text(`CITY/MUNICIPALITY: LAWAAN`, 105, 23);
        doc.text(`BARANGAY: BARANGAY 3`, 165, 23);
        doc.text(`NO. OF HOUSEHOLD MEMBERS: ${selectedData.length}`, 240, 23);

        doc.line(14, 26, 283, 26); // Bottom line

        // Table Generation
        autoTable(doc, {
            startY: 30,
            head: [[
                'LAST NAME', 'FIRST NAME', 'MIDDLE NAME', 'EXT', 'PLACE OF BIRTH',
                'DATE OF BIRTH', 'AGE', 'SEX', 'CIVIL STATUS', 'CITIZENSHIP', 'OCCUPATION', 'INDICATIONS','RELATIONSHIP TO HOUSEHOLD MEMBERS', 'REMARKS'
            ]],
            body: selectedData.map(p => [
                (p.last_name || '').toUpperCase(),
                (p.first_name || '').toUpperCase(),
                (p.middle_name || '').toUpperCase(),
                (p.extension_name || '').toUpperCase(),
                (p.place_of_birth || '').toUpperCase(),
                p.date_of_birth,
                p.age,
                (p.sex || '').toUpperCase(),
                (p.civil_status || '').toUpperCase(),
                (p.citizenship || '').toUpperCase(),
                (p.occupation || '').toUpperCase(),
                (p.special_indication || '').toUpperCase(),
                (p.relationship_to_head || '').toUpperCase(),
                (p.remarks || '').toUpperCase()
            ]),
            styles: { fontSize: 7, cellPadding: 2, lineWidth: 0.1, lineColor: [200, 200, 200] },
            headStyles: { fillStyle: 'F', fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' },
        });

        doc.save(`B3_Registry_Export_${new Date().toISOString().slice(0,10)}.pdf`);
    };

    // --- SEARCH LOGIC ---
    const filteredInhabitants = useMemo(() => {
        return inhabitants.filter(person =>
            `${person.first_name} ${person.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
            (person.street_name && person.street_name.toLowerCase().includes(search.toLowerCase())) ||
            person.id.toString().includes(search)
        );
    }, [search, inhabitants]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this inhabitant?')) {
            router.delete(route('inhabitants.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                            Registry <span className="text-blue-600">Ledger</span>
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Barangay 3 Official Records</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={exportToPDF}
                            disabled={selectedIds.length === 0}
                            className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl font-black transition-all text-xs uppercase ${
                                selectedIds.length > 0
                                ? 'bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 shadow-xl shadow-red-100'
                                : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed opacity-50'
                            }`}
                        >
                            📄 Export PDF ({selectedIds.length})
                        </button>
                        <Link
                            href={route('inhabitants.create')}
                            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 text-xs uppercase"
                        >
                            ＋ Register New
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Barangay Registry Ledger" />

            <div className="py-8 px-4 max-w-[100rem] mx-auto">
                {/* SEARCH BAR */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400 group-focus-within:text-blue-600 transition-colors text-xl">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by name, street, or ID..."
                            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-[2.5rem] focus:ring-4 focus:ring-blue-50 focus:border-blue-500 shadow-sm transition-all font-bold text-slate-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-8 py-4 rounded-[2.5rem] border border-blue-100 flex flex-col justify-center min-w-[140px]">
                        <span className="text-[10px] font-black uppercase opacity-60">Total Results</span>
                        <span className="text-2xl font-black leading-none">{filteredInhabitants.length}</span>
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="p-6 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            checked={selectedIds.length === filteredInhabitants.length && filteredInhabitants.length > 0}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Inhabitant / Bio</th>
                                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Occupation / Status</th>
                                    <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredInhabitants.length > 0 ? (
                                    filteredInhabitants.map((person) => (
                                        <tr key={person.id} className={`hover:bg-blue-50/20 transition-all duration-200 group ${selectedIds.includes(person.id) ? 'bg-blue-50/40' : ''}`}>
                                            <td className="p-6 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                                    checked={selectedIds.includes(person.id)}
                                                    onChange={() => toggleSelect(person.id)}
                                                />
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-[1.25rem] bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all text-lg">
                                                        {person.last_name[0]}{person.first_name[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-slate-900 text-base uppercase leading-tight">
                                                            {person.last_name}, {person.first_name}
                                                        </div>
                                                        <div className="text-[11px] font-black mt-1">
                                                            <span className={person.sex === 'Male' ? 'text-blue-500' : 'text-pink-500'}>{person.sex}</span>
                                                            <span className="mx-2 text-slate-300">•</span>
                                                            <span className="text-slate-500">AGE: {person.age}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="text-sm font-bold text-slate-700">{person.street_name || 'N/A'}</div>
                                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Brgy 3, {person.city_municipality}</div>
                                            </td>
                                            <td className="p-6">
                                                <div className="text-sm font-bold text-slate-600 italic">{person.occupation || 'Unemployed'}</div>
                                                {person.special_indication && (
                                                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-[9px] font-black rounded-full uppercase tracking-widest">
                                                        ⚠️ {person.special_indication}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route('inhabitants.edit', person.id)}
                                                        className="px-5 py-2.5 bg-white border-2 border-slate-100 text-slate-600 rounded-xl font-black text-[10px] hover:border-blue-600 hover:text-blue-600 transition-all uppercase"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(person.id)}
                                                        className="px-5 py-2.5 bg-white border-2 border-slate-100 text-red-400 rounded-xl font-black text-[10px] hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-all uppercase"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-32 text-center">
                                            <div className="text-6xl mb-6">📂</div>
                                            <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">No Records Found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
