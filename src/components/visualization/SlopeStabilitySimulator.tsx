import { useState } from 'preact/hooks';
import { recordExploration } from '../../lib/storage';
import InteractiveSlider from './InteractiveSlider';
import type { Locale } from '../../i18n';

export default function SlopeStabilitySimulator({
  experienceSlug = 'why-do-landslides-happen',
  locale = 'en',
}: {
  experienceSlug?: string;
  locale?: Locale;
}) {
  const [slopeAngle, setSlopeAngle] = useState<number>(30); // degrees
  const [saturation, setSaturation] = useState<number>(40); // percent soil water saturation
  const [vegetationCover, setVegetationCover] = useState<number>(70); // percent root cover
  const isId = locale === 'id';

  const handleAngleChange = (val: number) => {
    setSlopeAngle(val);
    if (experienceSlug) recordExploration(experienceSlug, 'simulation', `angle:${val}`);
  };

  const handleSatChange = (val: number) => {
    setSaturation(val);
    if (experienceSlug) recordExploration(experienceSlug, 'simulation', `saturation:${val}`);
  };

  const handleVegChange = (val: number) => {
    setVegetationCover(val);
    if (experienceSlug) recordExploration(experienceSlug, 'simulation', `vegetation:${val}`);
  };

  // Simplified Mohr-Coulomb / Factor of Safety (FoS) Physics Approximation
  // FoS = Resisting Forces / Driving Forces
  // Driving force proportional to sin(slopeAngle) + water weight
  const drivingForce = Math.sin((slopeAngle * Math.PI) / 180) * (1 + saturation / 150);

  // Resisting force proportional to friction cos(slopeAngle) * (1 - pore pressure) + root cohesion
  const frictionFactor = Math.cos((slopeAngle * Math.PI) / 180) * (1 - (saturation / 100) * 0.6);
  const cohesionFactor = (vegetationCover / 100) * 0.45 + 0.15;
  const resistingForce = Math.max(0.05, frictionFactor + cohesionFactor);

  const factorOfSafety = Math.max(0.2, resistingForce / Math.max(0.05, drivingForce));
  const isUnstable = factorOfSafety < 1.0;
  const isMarginal = factorOfSafety >= 1.0 && factorOfSafety < 1.3;

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6 shadow-sm">
      <div class="border-b border-[var(--color-border)] pb-4 space-y-1">
        <div class="flex items-center gap-2">
          <h4 class="text-base sm:text-lg font-bold text-[var(--color-text)]">
            {isId ? 'Simulator Stabilitas Lereng & Faktor Keamanan (FoS)' : 'Slope Stability & Factor of Safety Simulator'}
          </h4>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
            {isId ? 'Model Geomekanika' : 'Geomechanical Model'}
          </span>
        </div>
        <p class="text-xs text-[var(--color-text-muted)]">
          {isId
            ? 'Atur sudut kemiringan lereng, kejenuhan air hujan pori tanah, dan kohesi akar vegetasi untuk menguji kapan gaya gravitasi pendorong melampaui ketahanan geser tanah.'
            : 'Manipulate hill slope angle, pore-water rainfall saturation, and root cohesion to test when driving gravitational forces overcome soil shear resistance.'}
        </p>
      </div>

      {/* Parameter Control Sliders */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
        <InteractiveSlider
          id="slope-angle"
          label={isId ? 'Kemiringan Lereng' : 'Slope Incline'}
          value={slopeAngle}
          min={10}
          max={60}
          step={2}
          unit={isId ? '° derajat' : '° degrees'}
          description={isId ? 'Sudut kemiringan medan lereng bukit.' : 'Angle of hillside terrain.'}
          onChange={handleAngleChange}
        />

        <InteractiveSlider
          id="water-saturation"
          label={isId ? 'Kejenuhan Air Hujan' : 'Monsoon Saturation'}
          value={saturation}
          min={0}
          max={100}
          step={5}
          unit={isId ? '% air pori' : '% pore water'}
          description={isId ? 'Tekanan pori mengurangi friksi/gesekan antartanah.' : 'Pore pressure reduces friction.'}
          onChange={handleSatChange}
        />

        <InteractiveSlider
          id="vegetation-roots"
          label={isId ? 'Tutupan Vegetasi & Akar' : 'Root Vegetation Cover'}
          value={vegetationCover}
          min={0}
          max={100}
          step={5}
          unit={isId ? '% kanopi pohon' : '% tree canopy'}
          description={isId ? 'Sistem perakaran mengikat tanah yang gembur.' : 'Root systems bind loose soil.'}
          onChange={handleVegChange}
        />
      </div>

      {/* Real-Time Geomechanical Status Readout */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1 text-center">
          <span class="text-[10px] font-mono uppercase text-[var(--color-text-dim)] font-semibold">
            {isId ? 'Gaya Gravitasi Pendorong (Menuruni Lereng)' : 'Driving Gravity Force (Downslope)'}
          </span>
          <div class="text-xl font-mono font-bold text-[var(--color-text)]">
            {drivingForce.toFixed(2)}
          </div>
        </div>

        <div class="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1 text-center">
          <span class="text-[10px] font-mono uppercase text-[var(--color-text-dim)] font-semibold">
            {isId ? 'Kekuatan Geser Penahan (Friksi + Kohesi)' : 'Resisting Shear Strength (Friction + Cohesion)'}
          </span>
          <div class="text-xl font-mono font-bold text-[var(--color-text)]">
            {resistingForce.toFixed(2)}
          </div>
        </div>

        <div
          class={`p-4 rounded-xl border space-y-1 text-center ${
            isUnstable
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
              : isMarginal
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
          }`}
        >
          <span class="text-[10px] font-mono uppercase font-bold tracking-wider">
            {isId ? 'Faktor Keamanan (Factor of Safety / FoS)' : 'Factor of Safety (FoS)'}
          </span>
          <div class="text-2xl font-mono font-extrabold">
            {factorOfSafety.toFixed(2)}
          </div>
          <div class="text-[10px] font-semibold uppercase">
            {isUnstable
              ? (isId ? '⚠️ KEGAGALAN KRITIS / LONGSOR' : '⚠️ CRITICAL FAILURE / LANDSLIDE')
              : isMarginal
              ? (isId ? '⚡ STABIL MARGINAL' : '⚡ MARGINALLY STABLE')
              : (isId ? '✓ LERENG STABIL' : '✓ STABLE SLOPE')}
          </div>
        </div>
      </div>

      {/* Narrative Scientific Breakdown */}
      <div class="rounded-xl p-4 bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs space-y-2">
        <p class="text-[var(--color-text)]">
          <strong class="font-semibold">{isId ? 'Aturan Faktor Keamanan: ' : 'Factor of Safety Rule: '}</strong>
          {isId
            ? <>Ketika <strong>FoS &lt; 1,0</strong>, gaya gravitasi melampaui kekuatan geser tanah dan terjadi peristiwa gerakan massa tanah (longsor).</>
            : <>When <strong>FoS &lt; 1.0</strong>, gravity exceeds the shear strength of soil and a mass wasting event occurs.</>}
        </p>
        <p class="text-[var(--color-text-muted)]">
          {isId
            ? 'Pada musim hujan di Indonesia (Desember–Februari), curah hujan tinggi secara bersamaan meningkatkan beban air dan menciptakan tekanan air pori positif yang merenggangkan butiran tanah, memicu tanah longsor di pemukiman lereng bukit yang terdeforestasi (seperti longsor Cimanggung 2021 di Sumedang, Jawa Barat).'
            : 'In Indonesia’s rainy season (December–February), heavy rainfall simultaneously increases driving weight and creates positive pore-water pressure that pushes soil grains apart, causing catastrophic landslides in deforested hillside communities (such as the 2021 Cimanggung landslide in Sumedang, West Java).'}
        </p>
      </div>
    </div>
  );
}
