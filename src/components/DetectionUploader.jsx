import React, { useRef, useState } from 'react';
import { Upload, Camera, Loader2 } from 'lucide-react';

const VIOLATION_LABELS = [
  { key: 'helmetless', label: 'Helmetless Riding' },
  { key: 'wrong_side', label: 'Wrong-side Driving' },
  { key: 'signal_jump', label: 'Signal Jumping' },
];

export default function DetectionUploader({ onDetect }) {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (files) => {
    if (!files || !files[0]) return;
    const file = files[0];
    setError('');
    setLoading(true);

    try {
      // Convert to base64 for preview/evidence
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Fake lightweight AI scoring on client (placeholder for backend model)
      // We'll infer a violation type by simple filename keywords; otherwise random.
      const name = file.name.toLowerCase();
      let type = 'helmetless';
      if (name.includes('wrong')) type = 'wrong_side';
      else if (name.includes('signal') || name.includes('red')) type = 'signal_jump';
      const confidence = Math.round(70 + Math.random() * 30);

      // EXIF geotag extraction attempt (if available)
      let location = null;
      try {
        // Browser EXIF reading minimal approach without external deps
        // Many images (esp. from WhatsApp) strip EXIF; we gracefully ignore failures
        // We only attempt for JPEG
        const arrayBuf = await file.arrayBuffer();
        const view = new DataView(arrayBuf);
        // Quick JPEG EXIF check
        if (view.getUint16(0, false) === 0xFFD8) {
          // Very lightweight search for GPS strings to decide presence
          // Not a full EXIF parser, just heuristic
          const ascii = new TextDecoder('latin1').decode(new Uint8Array(arrayBuf));
          if (ascii.includes('GPS') || ascii.includes('G P S')) {
            // We don't parse exact coords reliably here; mark as unknown-present
            location = { lat: null, lng: null, note: 'GPS data present (not fully parsed)' };
          }
        }
      } catch (_) {}

      const payload = {
        id: crypto.randomUUID(),
        time: new Date().toISOString(),
        location,
        type,
        confidence,
        evidence: base64,
        sourceName: file.name,
      };

      onDetect?.(payload);
    } catch (e) {
      console.error(e);
      setError('Unable to analyze image. Please try a different file.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <section className="w-full">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="border-2 border-dashed rounded-xl p-6 sm:p-8 text-center bg-white shadow-sm hover:border-red-500 transition-colors"
      >
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
          {loading ? <Loader2 className="animate-spin"/> : <Upload/>}
        </div>
        <h3 className="font-semibold text-lg">Upload or Drop Footage</h3>
        <p className="text-sm text-slate-600 mb-4">Add an image frame or snapshot. The system will detect helmetless riding, wrong-side driving, or signal jumping.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
            disabled={loading}
          >
            {loading ? <Loader2 size={16} className="animate-spin"/> : <Camera size={16}/>} Select Image
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {VIOLATION_LABELS.map(v => (
            <span key={v.key} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{v.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
