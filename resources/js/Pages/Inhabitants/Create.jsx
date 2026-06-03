import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        region: 'Region VIII',
        province: 'EASTERN SAMAR',
        city_municipality: 'LAWAAN',
        barangay: 'BARANGAY 3',
        street_name: '',


        members: [
            {
                last_name: '', first_name: '', middle_name: '', extension_name: '',
                place_of_birth: '', date_of_birth: '', sex: '', civil_status: '',
                citizenship: 'Filipino', occupation: '', special_indication: '',
                relationship_to_head: 'Head'
            }
        ]
    });

    const addMember = () => {
        setData('members', [
            ...data.members,
            { last_name: '', first_name: '', middle_name: '', extension_name: '', place_of_birth: '', date_of_birth: '', sex: '', civil_status: '', citizenship: 'Filipino', occupation: '', special_indication: '', relationship_to_head: '' }
        ]);
    };

    const removeMember = (index) => {
        if (data.members.length > 1) {
            const newMembers = [...data.members];
            newMembers.splice(index, 1);
            setData('members', newMembers);
        }
    };

    const updateMember = (index, field, value) => {
        const newMembers = [...data.members];
        newMembers[index][field] = value;
        setData('members', newMembers);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('inhabitants.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                        RBI <span className="text-blue-600">PAG-REHISTRO</span>
                    </h2>
                    <Link href={route('inhabitants.index')} className="text-xs font-black text-slate-400 hover:text-blue-600 transition uppercase tracking-widest">
                        ← Balik ha Listahan
                    </Link>
                </div>
            }
        >
            <Head title="New Family Registration" />

            <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50">
                <form onSubmit={submit} className="space-y-8">

                    {/* SECTION 1: ADDRESS HAN PAMILYA (USA LA INI) */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100">
                        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-6 h-6 bg-blue-600 text-white rounded-lg flex items-center justify-center text-[10px]">I</span>
                            DIREKSYON / ADDRESS (HOUSEHOLD)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-2">
                                <InputLabel value="Region" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl bg-slate-50" value={data.region} readOnly />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel value="Province" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl bg-slate-50" value={data.province} readOnly />
                            </div>
                            <div className="md:col-span-4">
                                <InputLabel value="Street Name / House No. / Purok" />
                                <TextInput
                                    className="w-full mt-1 border-slate-200 rounded-2xl focus:ring-blue-500 font-bold"
                                    placeholder="Enter complete address here..."
                                    value={data.street_name}
                                    onChange={e => setData('street_name', e.target.value)}
                                />
                                <InputError message={errors.street_name} />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel value="City / Municipality" />
                                <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={data.city_municipality} onChange={e => setData('city_municipality', e.target.value)} />
                                <InputError message={errors.city_municipality} />
                            </div>
                            <div className="md:col-span-2">
                                <InputLabel value="Barangay" />
                                <TextInput className="w-full mt-1 bg-slate-50 border-slate-200 rounded-2xl opacity-70" value={data.barangay} readOnly />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: MGA TAWO HA SULOD HITO NGA BALAY */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-4">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-6 h-6 bg-slate-400 text-white rounded-lg flex items-center justify-center text-[10px]">II</span>
                                MGA MIYEMBRO ({data.members.length})
                            </h3>
                            <button
                                type="button"
                                onClick={addMember}
                                className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition active:scale-95"
                            >
                                + ADD FAMILY MEMBER
                            </button>
                        </div>

                        {data.members.map((member, index) => (
                            <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 relative group transition-all hover:border-blue-200">
                                <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                                    <h4 className="font-black text-slate-800 uppercase text-sm tracking-tight">
                                        Member #{index + 1} {index === 0 ? <span className="text-blue-600 ml-2">(Household Head)</span> : ''}
                                    </h4>
                                    {data.members.length > 1 && (
                                        <button type="button" onClick={() => removeMember(index)} className="text-[10px] font-black text-red-500 uppercase hover:underline tracking-widest transition">REMOVE</button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <InputLabel value="Last Name" />
                                        <TextInput className="w-full mt-1 border-slate-200 rounded-2xl font-bold uppercase" value={member.last_name} onChange={e => updateMember(index, 'last_name', e.target.value)} />
                                        <InputError message={errors[`members.${index}.last_name`]} />
                                    </div>
                                    <div>
                                        <InputLabel value="First Name" />
                                        <TextInput className="w-full mt-1 border-slate-200 rounded-2xl font-bold uppercase" value={member.first_name} onChange={e => updateMember(index, 'first_name', e.target.value)} />
                                        <InputError message={errors[`members.${index}.first_name`]} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <InputLabel value="Middle Name" />
                                            <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={member.middle_name} onChange={e => updateMember(index, 'middle_name', e.target.value)} />
                                        </div>
                                        <div>
                                            <InputLabel value="Ext (Jr/Sr)" />
                                            <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={member.extension_name} onChange={e => updateMember(index, 'extension_name', e.target.value)} />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel value="Date of Birth" />
                                        <TextInput type="date" className="w-full mt-1 border-slate-200 rounded-2xl text-sm" value={member.date_of_birth} onChange={e => updateMember(index, 'date_of_birth', e.target.value)} />
                                        <InputError message={errors[`members.${index}.date_of_birth`]} />
                                    </div>
                                    <div>
                                        <InputLabel value="Place of Birth" />
                                        <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={member.place_of_birth} onChange={e => updateMember(index, 'place_of_birth', e.target.value)} />
                                    </div>
                                    <div>
                                        <InputLabel value="Sex" />
                                        <select className="w-full border-slate-200 rounded-2xl py-3 mt-1 text-sm bg-white font-bold" value={member.sex} onChange={e => updateMember(index, 'sex', e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div>
                                        <InputLabel value="Civil Status" />
                                        <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={member.civil_status} onChange={e => updateMember(index, 'civil_status', e.target.value)} />
                                    </div>
                                    <div>
                                        <InputLabel value="Occupation" />
                                        <TextInput className="w-full mt-1 border-slate-200 rounded-2xl" value={member.occupation} onChange={e => updateMember(index, 'occupation', e.target.value)} />
                                    </div>
                                    <div>
                                        <InputLabel value="Relationship" />
                                        <TextInput className="w-full mt-1 border-slate-200 rounded-2xl font-bold text-blue-600" placeholder="e.g. Spouse, Son" value={member.relationship_to_head} onChange={e => updateMember(index, 'relationship_to_head', e.target.value)} />
                                    </div>

                                    <div className="md:col-span-3">
                                        <InputLabel value="Special Indications / Category" className="text-slate-500 font-bold" />
                                        <select
                                            className="w-full mt-1 border-slate-200 rounded-2xl py-3 px-4 text-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-slate-700"
                                            value={member.special_indication || ''}
                                            onChange={e => updateMember(index, 'special_indication', e.target.value)}
                                        >
                                            <option value="">None / Not Applicable</option>
                                            <option value="Labor/Employed">Labor / Employed</option>
                                            <option value="Unemployed">Unemployed</option>
                                            <option value="PWD">PWD (Person with Disability)</option>
                                            <option value="Senior Citizen">Senior Citizen</option>
                                            <option value="OFW">OFW (Overseas Filipino Worker)</option>
                                            <option value="Solo Parent">Solo Parent</option>
                                            <option value="OSY">Out of School Youth (OSY)</option>
                                            <option value="OSC">Out of School Children (OSC)</option>
                                            <option value="IP">IP (Indigenous People)</option>
                                        </select>
                                        <InputError message={errors[`members.${index}.special_indication`]} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="flex items-center justify-between bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl">
                        <div className="hidden sm:block text-white">
                            <h4 className="font-black text-xl tracking-tight leading-none">SAVE ALL RECORDS</h4>
                            <p className="text-slate-400 text-xs mt-1 italic uppercase">This will save all {data.members.length} members to the registry.</p>
                        </div>
                        <PrimaryButton className="px-16 py-4 bg-blue-600 rounded-2xl shadow-xl hover:bg-blue-500 transition-all font-black" disabled={processing}>
                            FINALIZE & SAVE
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
