import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default function Index({ auth, inhabitants }) {
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [householdNumber, setHouseholdNumber] = useState('1');

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredInhabitants.length && filteredInhabitants.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredInhabitants.map(p => p.id));
        }
    };

    const confirmExport = () => {
        const selectedData = inhabitants.filter(p => selectedIds.includes(p.id));
        const doc = new jsPDF('landscape', 'mm', 'a4');
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("BARANGAY REGISTERED INHABITANTS' CY 2026", 148, 15, { align: "center" });
        doc.setFontSize(9);
        doc.setLineWidth(0.5);
        doc.line(14, 18, 283, 18);
        doc.text(`REGION: VIII`, 14, 23);
        doc.text(`PROVINCE: EASTERN SAMAR`, 45, 23);
        doc.text(`CITY/MUNICIPALITY: LAWAN`, 105, 23);
        doc.text(`BARANGAY: BARANGAY 3`, 165, 23);
        doc.text(`NO. OF HOUSEHOLD MEMBER: ${householdNumber}`, 220, 23);
        doc.line(14, 26, 283, 26);

        autoTable(doc, {
            startY: 30,
            head: [['LAST NAME', 'FIRST NAME', 'MIDDLE NAME', 'EXT', 'PLACE OF BIRTH', 'DATE OF BIRTH', 'AGE', 'SEX', 'STATUS', 'CITIZENSHIP', 'OCCUPATION', 'INDICATIONS', 'RELATIONSHIP', 'REMARKS']],
            body: selectedData.map(p => [
                (p.last_name || '').toUpperCase(), (p.first_name || '').toUpperCase(), (p.middle_name || '').toUpperCase(), (p.extension_name || '').toUpperCase(), (p.place_of_birth || '').toUpperCase(), p.date_of_birth, p.age, (p.sex || '').toUpperCase(), (p.civil_status || '').toUpperCase(), (p.citizenship || '').toUpperCase(), (p.occupation || '').toUpperCase(), (p.special_indication || '').toUpperCase(), (p.relationship_to_head || '').toUpperCase(), (p.remarks || '').toUpperCase()
            ]),
            styles: { fontSize: 6, cellPadding: 1, lineWidth: 0.1 },
            headStyles: { fillColor: [30, 41, 59], textColor: 255 },
        });

        doc.save(`B3_Household_${householdNumber}.pdf`);
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this inhabitant?")) {
            router.delete(route('inhabitants.destroy', id), {
                onSuccess: () => setSelectedIds(prev => prev.filter(i => i !== id))
            });
        }
    };

    const filteredInhabitants = useMemo(() => {
        return inhabitants.filter(person =>
            `${person.first_name} ${person.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
            (person.street_name && person.street_name.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, inhabitants]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Registry Ledger" />

            {/* MODERN GLASS MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
                    <div className="bg-white w-full max-w-sm rounded-[3rem] shadow-2xl p-10 border border-white animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-2xl mb-6">📄</div>
                        <h3 className="text-2xl font-black text-slate-900 leading-tight">Export <br/><span className="text-blue-600">Document</span></h3>
                        <div className="mt-8 space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Household Number</label>
                            <input
                                type="text"
                                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-blue-500"
                                value={householdNumber}
                                onChange={(e) => setHouseholdNumber(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 mt-10">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-black text-xs uppercase text-slate-400 hover:text-slate-600">Back</button>
                            <button onClick={confirmExport} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase shadow-xl hover:bg-blue-600 transition-all">Export Now</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-12">
                <div className="max-w-[90rem] mx-auto">

                    {/* FLOATING HEADER */}
                    <div className="bg-white/80 backdrop-blur-md sticky top-6 z-50 p-6 rounded-[2.5rem] border border-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-6">
                            <div className="hidden sm:flex w-14 h-14 bg-slate-900 rounded-2xl items-center justify-center text-white font-black">B3</div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">REGISTRY <span className="text-blue-600 font-black">LEDGER</span></h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Management System v2.0</p>
                            </div>
                        </div>

                        <div className="flex flex-1 max-w-xl mx-0 md:mx-8">
                            <div className="relative w-full group">
                                <input
                                    type="text"
                                    placeholder="Quick search inhabitants..."
                                    className="w-full pl-12 pr-6 py-4 bg-slate-100/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600">🔍</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => selectedIds.length > 0 && setIsModalOpen(true)}
                                className={`px-6 py-4 rounded-2xl font-black text-[10px] uppercase transition-all ${
                                    selectedIds.length > 0 ? 'bg-red-50 text-red-600 shadow-lg' : 'bg-slate-50 text-slate-300'
                                }`}
                            >
                                PDF Export ({selectedIds.length})
                            </button>
                            <Link href={route('inhabitants.create')} className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all">
                                + Register
                            </Link>
                        </div>
                    </div>

                    {/* STATS STRIP */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Population</span>
                            <span className="text-2xl font-black text-slate-900 mt-2">{filteredInhabitants.length}</span>
                        </div>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selection Count</span>
                            <span className="text-2xl font-black text-blue-600 mt-2">{selectedIds.length}</span>
                        </div>
                    </div>

                    {/* THE NEW LIST LEDGER */}
                    <div className="space-y-4">
                        <div className="px-8 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <div className="flex items-center gap-8">
                                <input type="checkbox" className="rounded-md border-slate-200" checked={selectedIds.length === filteredInhabitants.length} onChange={toggleSelectAll} />
                                <span>Inhabitant Details</span>
                            </div>
                            <div className="hidden lg:grid grid-cols-3 gap-12 w-1/2">
                                <span>Address</span>
                                <span>Occupation</span>
                                <span className="text-right">Manage</span>
                            </div>
                        </div>

                        {filteredInhabitants.map((person) => (
                            <div key={person.id} className={`group bg-white p-4 lg:p-6 rounded-[2.5rem] border transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${selectedIds.includes(person.id) ? 'border-blue-500 shadow-xl shadow-blue-50' : 'border-white shadow-sm hover:shadow-md'}`}>
                                <div className="flex items-center gap-6">
                                    <input
                                        type="checkbox"
                                        className="rounded-lg border-slate-200 text-blue-600 focus:ring-0"
                                        checked={selectedIds.includes(person.id)}
                                        onChange={() => toggleSelect(person.id)}
                                    />
                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center font-black text-xl transition-colors ${selectedIds.includes(person.id) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-900 group-hover:text-white'}`}>
                                        {person.last_name[0]}{person.first_name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 uppercase tracking-tight text-lg leading-none">{person.last_name}, {person.first_name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                                            {person.sex} <span className="mx-2 opacity-30">|</span> AGE: {person.age} <span className="mx-2 opacity-30">|</span> {person.relationship_to_head}
                                        </p>
                                    </div>
                                </div>

                                <div className="lg:grid grid-cols-3 gap-12 w-full lg:w-1/2 items-center px-2 lg:px-0">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-300 uppercase mb-1">Location</span>
                                        <span className="text-xs font-bold text-slate-600 truncate">{person.street_name || 'No Street'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-300 uppercase mb-1">Status</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-600 truncate">{person.occupation || 'Unemployed'}</span>
                                            {person.special_indication && <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>}
                                        </div>
                                    </div>
                                    <div className="flex justify-start lg:justify-end items-center gap-2">
                                        <Link href={route('inhabitants.edit', person.id)} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-900 hover:text-white transition-all text-xs font-black uppercase">Edit</Link>
                                        <button onClick={() => handleDelete(person.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all text-xs font-black uppercase">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
