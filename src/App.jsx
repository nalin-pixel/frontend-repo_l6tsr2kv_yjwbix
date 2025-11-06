import React, { useState } from 'react';
import Header from './components/Header';
import DetectionUploader from './components/DetectionUploader';
import ViolationTable from './components/ViolationTable';
import MetricsPanel from './components/MetricsPanel';
import ReportDrawer from './components/ReportDrawer';

export default function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDetect = (violation) => {
    setItems(prev => [violation, ...prev]);
  };

  const handleSelect = (item) => {
    setSelected(item);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DetectionUploader onDetect={handleDetect} />
            <ViolationTable items={items} onSelect={handleSelect} />
          </div>
          <div className="lg:col-span-1">
            <MetricsPanel items={items} />
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-rose-100">
              <h4 className="font-semibold mb-1">How this demo works</h4>
              <p className="text-sm text-slate-700">Upload a snapshot from roadside CCTV or a phone camera. The system infers the likely violation type and generates a structured report with time, optional geotag hints, confidence score, and evidence image. Click any row to view and export the report.</p>
            </div>
          </div>
        </section>
      </main>

      <ReportDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} item={selected} />
    </div>
  );
}
