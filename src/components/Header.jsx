import React from 'react';
import { ShieldAlert, MapPin, Gauge } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-600 text-white shadow-sm">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Smart Traffic Violation Dashboard</h1>
            <p className="text-xs text-slate-600">Kengeri & Global Village — Automated Detection & Reporting</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-4 text-slate-700">
          <span className="inline-flex items-center gap-2 text-sm"><Gauge size={16}/> Metrics</span>
          <span className="inline-flex items-center gap-2 text-sm"><MapPin size={16}/> Hotspots</span>
        </nav>
      </div>
    </header>
  );
}
