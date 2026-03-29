import React from 'react';

export default function ActionCard({ title, desc, icon }) {
    return (
        <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                {title}
            </h3>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                {desc}
            </p>

            {/* Added a subtle "Learn More" arrow for that pro feel */}
            <div className="mt-4 flex items-center text-blue-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                OPEN MODULE <span className="ml-1">→</span>
            </div>
        </div>
    );
}
