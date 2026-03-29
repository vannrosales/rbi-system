import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Edit({ auth, inhabitant }) {
    // Initialize with all one-table fields
    const { data, setData, patch, processing, errors } = useForm({
        // Geographic Info
        region: inhabitant.region || 'Region VIII',
        province: inhabitant.province || 'Leyte',
        city_municipality: inhabitant.city_municipality || '',
        barangay: inhabitant.barangay || 'Barangay 3',
        street_name: inhabitant.street_name || '',

        // Personal Info
        last_name: inhabitant.last_name || '',
        first_name: inhabitant.first_name || '',
        middle_name: inhabitant.middle_name || '',
        extension_name: inhabitant.extension_name || '',
        place_of_birth: inhabitant.place_of_birth || '',
        date_of_birth: inhabitant.date_of_birth || '',
        sex: inhabitant.sex || '',
        civil_status: inhabitant.civil_status || '',
        citizenship: inhabitant.citizenship || 'Filipino',
        occupation: inhabitant.occupation || '',
        special_indication: inhabitant.special_indication || '', // matched column name
        relationship_to_head: inhabitant.relationship_to_head || '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Standard PATCH request for Inertia updates
        patch(route('inhabitants.update', inhabitant.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                        Edit <span className="text-blue-600 tracking-tighter">Inhabitant Record</span>
                    </h2>
                    <Link href={route('inhabitants.index')} className="text-sm font-black text-slate-400 hover:text-blue-600 transition uppercase tracking-widest">
                        ← Back to Ledger
                    </Link>
                </div>
            }
        >
            <Head title={`Edit ${inhabitant.last_name} - B3`} />

            <div className="py-12 max-w-5xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={submit} className="space-y-8">

                    {/* 1. GEOGRAPHIC DATA CARD */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6">I. Location Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <InputLabel value="Street Name / House No. / Purok" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={data.street_name} onChange={e => setData('street_name', e.target.value)} />
                                <InputError message={errors.street_name} />
                            </div>
                            <div>
                                <InputLabel value="City / Municipality" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={data.city_municipality} onChange={e => setData('city_municipality', e.target.value)} />
                                <InputError message={errors.city_municipality} />
                            </div>
                            <div>
                                <InputLabel value="Barangay" />
                                <TextInput className="w-full mt-1 bg-slate-50 border-slate-200 rounded-2xl" value={data.barangay} readOnly />
                            </div>
                        </div>
                    </div>

                    {/* 2. PERSONAL DATA CARD */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6">II. Personal Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <InputLabel value="Last Name" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl font-bold" value={data.last_name} onChange={e => setData('last_name', e.target.value)} />
                                <InputError message={errors.last_name} />
                            </div>
                            <div>
                                <InputLabel value="First Name" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl font-bold" value={data.first_name} onChange={e => setData('first_name', e.target.value)} />
                                <InputError message={errors.first_name} />
                            </div>
                            <div>
                                <InputLabel value="Middle Name" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={data.middle_name} onChange={e => setData('middle_name', e.target.value)} />
                            </div>

                            <div>
                                <InputLabel value="Date of Birth" />
                                <TextInput type="date" className="w-full mt-1 border-slate-200 rounded-2xl" value={data.date_of_birth} onChange={e => setData('date_of_birth', e.target.value)} />
                                <InputError message={errors.date_of_birth} />
                            </div>
                            <div>
                                <InputLabel value="Sex" />
                                <select className="w-full border-slate-200 rounded-2xl py-3 mt-1 text-sm" value={data.sex} onChange={e => setData('sex', e.target.value)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <InputLabel value="Civil Status" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={data.civil_status} onChange={e => setData('civil_status', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 border-t border-slate-50 pt-6">
                            <div>
                                <InputLabel value="Occupation" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={data.occupation} onChange={e => setData('occupation', e.target.value)} />
                            </div>
                            <div>
                                <InputLabel value="Relationship to Head" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl font-bold text-blue-600" value={data.relationship_to_head} onChange={e => setData('relationship_to_head', e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel value="Special Indications (PWD, Senior, etc.)" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={data.special_indication} onChange={e => setData('special_indication', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl">
                        <div className="text-white">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">System Record ID</p>
                            <p className="text-xl font-mono">#{inhabitant.id.toString().padStart(4, '0')}</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href={route('inhabitants.index')} className="px-6 py-4 font-black text-slate-400 hover:text-white transition uppercase text-xs">Cancel</Link>
                            <PrimaryButton className="px-12 py-4 rounded-2xl bg-blue-600 shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all" disabled={processing}>
                                Save Changes
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
