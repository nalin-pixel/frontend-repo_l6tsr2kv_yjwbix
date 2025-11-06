import React from 'react';
import { X, Download, MapPin } from 'lucide-react';

export default function ReportDrawer({ open, onClose, item }) {
  if (!open || !item) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = item.evidence;
    a.download = `evidence_${item.id}.png`;
    a.click();
  };

  const reportText = `Traffic Violation Report\n\n` +
    `ID: ${item.id}\n` +
    `Time: ${new Date(item.time).toLocaleString()}\n` +
    `Location: ${item.location?.lat && item.location?.lng ? `${item.location.lat}, ${item.location.lng}` : 'Unknown'}\n` +
    `Violation: ${item.type}\n` +
    `Confidence: ${item.confidence}%\n` +
    `Source: ${item.sourceName || 'upload'}\n`;

  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Violation Report</h3>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100">
            <X size={18}/>
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-56px)]">
          <img src={item.evidence} alt={item.type} className="w-full rounded-lg border object-contain max-h-64" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-slate-50">
              <p className="text-slate-500">Time</p>
              <p className="font-medium">{new Date(item.time).toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50">
              <p className="text-slate-500">Violation</p>
              <p className="font-medium capitalize">{item.type.replace('_', ' ')}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 col-span-2">
              <p className="text-slate-500">Location</p>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin size={16} className="text-slate-500"/>
                {item.location?.lat && item.location?.lng ? (
                  <span>{item.location.lat.toFixed(6)}, {item.location.lng.toFixed(6)}</span>
                ) : (
                  <span>Unknown</span>
                )}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50">
              <p className="text-slate-500">Confidence</p>
              <p className="font-medium">{item.confidence}%</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50">
              <p className="text-slate-500">Source</p>
              <p className="font-medium">{item.sourceName || 'upload'}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Shareable Report (text)</h4>
            <textarea readOnly value={reportText} className="w-full h-28 text-sm p-3 border rounded-lg bg-slate-50" />
            <div className="flex gap-2">
              <button onClick={() => navigator.clipboard.writeText(reportText)} className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">Copy</button>
              <button onClick={handleDownload} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:bg-slate-50">
                <Download size={16}/> Evidence Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
