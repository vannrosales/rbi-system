import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, totalInhabitants, totalHouseholds, totalVoters, recentInhabitants, totalMale, totalFemale, totalSeniorCitizens }) {
    const firstName = auth?.user?.name ? auth.user.name.split(' ')[0] : 'Staff';

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">
                        Staff <span className="text-blue-600">Dashboard</span>
                    </h2>
                    <div className="hidden sm:block text-sm font-bold text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
                        Barangay 3 Official Records
                    </div>
                </div>
            }
        >
            <Head title="Dashboard - RBI Lawaan" />

            <div className="py-12 bg-slate-50/50 min-h-[calc(100vh-80px)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Welcome Banner */}
                    <div className="mb-10 p-10 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-white tracking-tight">Mabuhay, {firstName}!</h3>
                            <p className="text-slate-400 mt-2 max-w-md font-medium">
                                Managing the Registry of Lawaan Inhabitants for <span className="text-blue-400">Barangay 3</span>.
                            </p>
                        </div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all duration-700"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatCard label="Total Inhabitants" value={totalInhabitants} icon="👥" color="blue" />
                        <StatCard label="Total Households" value={totalHouseholds} icon="🏠" color="indigo" />
                        <StatCard label="Registered Voters" value={totalVoters} icon="🗳️" color="slate" />
                        <StatCard label="Total Male" value={totalMale} icon="♂️" color="blue" />
                        <StatCard label="Total Female" value={totalFemale} icon="♀️" color="pink" />
                        <StatCard label="Senior Citizens" value={totalSeniorCitizens} icon="👴" color="green" />
                        <StatCard label="Recent Updates" value={recentInhabitants?.length || 0} icon="⏳" color="green" />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Modules Panel */}
                        <div className="lg:col-span-1 space-y-6">
                            <h4 className="font-black text-slate-900 ml-1 uppercase text-xs tracking-widest opacity-50">Quick Actions</h4>
                            <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                                <Link
                                    href={route('inhabitants.create')}
                                    className="flex items-center gap-4 p-5 w-full bg-blue-600 text-white rounded-[1.5rem] font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition active:scale-95 group"
                                >
                                    <div className="bg-white/20 p-2 rounded-lg group-hover:rotate-12 transition text-xl">➕</div>
                                    Register Inhabitant
                                </Link>
                            </div>
                        </div>

                        {/* Recent Activity Panel */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex justify-between items-end ml-1">
                                <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest opacity-50">Latest Registrations</h4>
                                <Link href={route('inhabitants.index')} className="text-xs font-bold text-blue-600 hover:underline">View All Records</Link>
                            </div>

                            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 border-b border-slate-100">
                                        <tr>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resident Name</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Address</th>
                                            <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {recentInhabitants && recentInhabitants.length > 0 ? (
                                            recentInhabitants.map((person) => (
                                                <tr key={person.id} className="hover:bg-slate-50/80 transition group">
                                                    <td className="p-5">
                                                        <div className="font-bold text-slate-700 group-hover:text-blue-600 transition uppercase text-sm">
                                                            {person.last_name}, {person.first_name}
                                                        </div>
                                                        <div className="text-[9px] text-slate-400 font-bold tracking-tighter uppercase">ID: #{person.id.toString().padStart(4, '0')}</div>
                                                    </td>
                                                    <td className="p-5 text-slate-500 font-bold text-xs truncate max-w-[150px]">
                                                        {person.street_name || 'N/A'}
                                                    </td>
                                                    <td className="p-5">
                                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded-full uppercase border border-blue-100 whitespace-nowrap">
                                                            {person.relationship_to_head}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="p-10 text-center text-slate-400 font-bold text-xs italic">
                                                    No recent activity found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
