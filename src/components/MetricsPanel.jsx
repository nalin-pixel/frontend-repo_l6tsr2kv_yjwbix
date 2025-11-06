import React from 'react';
import { Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function MetricsPanel({ items = [] }) {
  const total = items.length;
  const highConf = items.filter(v => v.confidence >= 85).length;
  const avgConf = total ? Math.round(items.reduce((a, b) => a + b.confidence, 0) / total) : 0;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-slate-900 text-white"><Gauge size={18}/></div>
          <h4 className="font-semibold">Detections</h4>
        </div>
        <p className="text-2xl font-bold">{total}</p>
        <p className="text-xs text-slate-600">Total processed items</p>
      </div>
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700"><CheckCircle2 size={18}/></div>
          <h4 className="font-semibold">High Confidence</h4>
        </div>
        <p className="text-2xl font-bold">{highConf}</p>
        <p className="text-xs text-slate-600">Confidence ≥ 85%</p>
      </div>
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-700"><AlertTriangle size={18}/></div>
          <h4 className="font-semibold">Avg Confidence</h4>
        </div>
        <p className="text-2xl font-bold">{avgConf}%</p>
        <p className="text-xs text-slate-600">Across all detections</p>
      </div>
    </section>
  );
}
