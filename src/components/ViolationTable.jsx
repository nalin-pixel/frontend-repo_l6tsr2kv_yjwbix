import React from 'react';
import { MapPin, ImageOff, CheckCircle2, AlertTriangle } from 'lucide-react';

function badgeByType(type) {
  const map = {
    helmetless: 'bg-orange-100 text-orange-700',
    wrong_side: 'bg-purple-100 text-purple-700',
    signal_jump: 'bg-red-100 text-red-700',
  };
  return map[type] || 'bg-slate-100 text-slate-700';
}

export default function ViolationTable({ items = [], onSelect }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Evidence</th>
              <th className="px-4 py-3 text-left font-medium">Time</th>
              <th className="px-4 py-3 text-left font-medium">Location</th>
              <th className="px-4 py-3 text-left font-medium">Violation</th>
              <th className="px-4 py-3 text-left font-medium">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={5}>
                  <div className="flex items-center justify-center gap-2">
                    <ImageOff size={18}/> No violations detected yet. Upload an image to start.
                  </div>
                </td>
              </tr>
            )}
            {items.map((v) => (
              <tr key={v.id} className="border-t border-slate-100 hover:bg-slate-50/60 cursor-pointer" onClick={() => onSelect?.(v)}>
                <td className="px-4 py-3">
                  <img src={v.evidence} alt={v.type} className="h-14 w-20 object-cover rounded-md border" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(v.time).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin size={16} className="text-slate-500"/>
                    {v.location?.lat && v.location?.lng ? (
                      <span>{v.location.lat.toFixed(5)}, {v.location.lng.toFixed(5)}</span>
                    ) : (
                      <span className="text-slate-500">Unknown</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeByType(v.type)}`}>
                    {v.type === 'helmetless' ? 'Helmetless Riding' : v.type === 'wrong_side' ? 'Wrong-side Driving' : v.type === 'signal_jump' ? 'Signal Jumping' : v.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-2">
                    {v.confidence >= 85 ? (
                      <CheckCircle2 size={16} className="text-emerald-600"/>
                    ) : (
                      <AlertTriangle size={16} className="text-amber-600"/>
                    )}
                    <span>{v.confidence}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
