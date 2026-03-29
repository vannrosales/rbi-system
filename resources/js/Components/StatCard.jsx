import React from 'react';

export default function StatCard({ label, value, icon, color = 'blue' }) {
    const colors = {
        blue: 'text-blue-600 bg-blue-50',
        indigo: 'text-indigo-600 bg-indigo-50',
        slate: 'text-slate-600 bg-slate-50',
        green: 'text-green-600 bg-green-50'
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 transition hover:scale-105 duration-300">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${colors[color] || colors.blue}`}>
                <span className="text-xl">{icon}</span>
            </div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">{label}</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        </div>
    );
}
