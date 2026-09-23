import { useState } from 'preact/hooks';
import { recordExploration } from '../../lib/storage';
import InteractiveSlider from './InteractiveSlider';
import type { Locale } from '../../lib/i18nUrl';

export default function ClimateLatitudeSlider({
  experienceSlug = 'why-are-there-climate-zones',
  locale = 'en',
}: {
  experienceSlug?: string;
  locale?: Locale;
}) {
  const [latitude, setLatitude] = useState<number>(0); // 0 = Equator (Indonesia), 45 = Mid-latitude, 80 = Polar
  const isId = locale === 'id';

  const handleSliderChange = (val: number) => {
    setLatitude(val);
    if (experienceSlug) {
      recordExploration(experienceSlug, 'simulation', `latitude:${val}`);
    }
  };

  // Calculations for solar intensity
  // Solar elevation angle at equinox: 90 - latitude
  const sunAngle = Math.max(10, 90 - latitude);
  // Intensity factor (sin of sun angle)
  const intensity = Math.sin((sunAngle * Math.PI) / 180);
  const intensityPct = Math.round(intensity * 100);
  // Relative surface footprint of same light beam: 1 / sin(angle)
  const beamSpread = (1 / Math.sin((sunAngle * Math.PI) / 180)).toFixed(2);

  // Climate classification zone
  let zoneName = isId ? 'Zona Tropis / Ekuator' : 'Tropical / Equatorial Zone';
  let zoneColor = 'text-amber-500 bg-amber-500/10 border-amber-500/30';
  let zoneDescription = isId
    ? 'Penyinaran matahari bersudut tinggi sepanjang tahun. Suhu dan kelembapan tinggi, curah hujan konvektif lebat, tanpa musim dingin termal.'
    : 'Direct high-angle solar radiation year-round. High temperature, high humidity, convective rainfall, and no thermal winter.';
  let regionalExample = isId
    ? 'Indonesia (0° hingga 10°LS): Pontianak, Jakarta, Bogor, Bali.'
    : 'Indonesia (0° to 10°S): Pontianak, Jakarta, Bogor, Bali.';

  if (latitude >= 23.5 && latitude < 66.5) {
    zoneName = isId ? 'Zona Sedang / Lintang Menengah' : 'Temperate / Mid-Latitude Zone';
    zoneColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    zoneDescription = isId
      ? 'Sudut datang matahari moderat dengan pergantian 4 musim yang tegas (semi, panas, gugur, dingin) serta variasi panjang siang-malam.'
      : 'Moderate solar angle with marked seasonal variation in day length and temperature (spring, summer, autumn, winter).';
    regionalExample = isId
      ? 'Jepang, Australia Selatan, Eropa Mediterania, Amerika Utara.'
      : 'Japan, Southern Australia, Mediterranean Europe, North America.';
  } else if (latitude >= 66.5) {
    zoneName = isId ? 'Zona Kutub / Lintang Tinggi' : 'Polar / High-Latitude Zone';
    zoneColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    zoneDescription = isId
      ? 'Sudut datang sinar matahari sangat miring. Kontras pencahayaan ekstrem (matahari tengah malam vs malam kutub) dan lanskap es/tundra abadi.'
      : 'Low glancing sun angles. Extreme seasonal illumination contrasts (midnight sun vs polar night) and persistent ice/tundra biomes.';
    regionalExample = isId
      ? 'Antarktika, Greenland, Skandinavia Utara, Cekungan Arktik.'
      : 'Antarctica, Greenland, Northern Scandinavia, Arctic Basin.';
  }

  return (
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 space-y-6 shadow-sm">
      <div class="border-b border-[var(--color-border)] pb-4 space-y-1">
        <div class="flex items-center gap-2">
          <h4 class="text-base sm:text-lg font-bold text-[var(--color-text)]">
            {isId ? 'Simulator Radiasi Matahari & Zona Iklim Lintang' : 'Solar Irradiance & Latitude Climate Simulator'}
          </h4>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
            {isId ? 'Model Fisik' : 'Physical Model'}
          </span>
        </div>
        <p class="text-xs text-[var(--color-text-muted)]">
          {isId
            ? 'Geser lintang geografis untuk mengamati bagaimana kelengkungan Bumi menyebarkan berkas sinar matahari pada luas permukaan yang berbeda.'
            : 'Adjust the latitude slider to observe how Earth’s curvature spreads incoming solar rays across different surface areas.'}
        </p>
      </div>

      {/* Interactive Latitude Control Slider */}
      <div class="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)]">
        <InteractiveSlider
          id="climate-latitude"
          label={isId ? 'Lintang Planet' : 'Planetary Latitude'}
          value={latitude}
          min={0}
          max={85}
          step={5}
          unit={isId ? '° LU/LS' : '° North/South'}
          description={isId ? '0° mewakili Ekuator (Indonesia); 85° mewakili Gletser Kutub Tinggi.' : '0° represents the Equator (Indonesia); 85° represents High Polar Glaciers.'}
          onChange={handleSliderChange}
        />
      </div>

      {/* Dynamic Solar Ray SVG Model */}
      <div class="rounded-xl border border-[var(--color-border)] bg-slate-950 text-slate-100 p-5 space-y-4 select-none">
        <div class="flex items-center justify-between flex-wrap gap-2 text-xs font-mono border-b border-slate-800 pb-3">
          <span class="text-amber-400 font-bold">
            {isId ? 'Sudut Elevasi Matahari: ' : 'Sun Elevation Angle: '}{sunAngle}°
          </span>
          <span class="text-slate-400">
            {isId ? 'Intensitas Surya per m²: ' : 'Solar Intensity per m²: '}<strong class="text-white">{intensityPct}%</strong>
          </span>
          <span class="text-slate-400">
            {isId ? 'Penyebaran Berkas Cahaya: ' : 'Beam Surface Footprint: '}<strong class="text-cyan-300">{beamSpread}×</strong>
          </span>
        </div>

        {/* Ray Beam Geometry Visualizer */}
        <div class="w-full aspect-[2/1] min-h-[180px] sm:min-h-[220px] flex items-center justify-center">
          <svg viewBox="0 0 500 200" class="w-full h-full" role="img" aria-label="Sun beam dispersion diagram">
            {/* Ground Surface */}
            <line x1="50" y1="160" x2="450" y2="160" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
            <text x="200" y="185" fill="#94a3b8" font-size="11" font-family="monospace">
              {isId ? 'Horizon Permukaan Bumi' : "Earth's Surface Horizon"}
            </text>

            {/* Sun Icon */}
            <circle cx="100" cy="50" r="22" fill="#fbbf24" />
            <circle cx="100" cy="50" r="28" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" />

            {/* Incident Sunlight Ray Beams */}
            {/* Direct beam angled based on sunAngle */}
            {(() => {
              const rad = (sunAngle * Math.PI) / 180;
              const targetX = 300;
              const targetY = 160;
              const length = 140;
              const startX = targetX - length * Math.cos(rad);
              const startY = targetY - length * Math.sin(rad);

              const footprintWidth = 60 * parseFloat(beamSpread);

              return (
                <g id="light-beam">
                  {/* Incoming Ray Path */}
                  <polygon
                    points={`${startX - 20},${startY} ${startX + 20},${startY} ${targetX + footprintWidth / 2},${targetY} ${targetX - footprintWidth / 2},${targetY}`}
                    fill="#fef08a"
                    opacity="0.35"
                  />
                  {/* Central Ray Vector */}
                  <line
                    x1={startX}
                    y1={startY}
                    x2={targetX}
                    y2={targetY}
                    stroke="#facc15"
                    stroke-width="3"
                    stroke-dasharray="6,3"
                  />
                  {/* Ground Footprint Illumination Area */}
                  <rect
                    x={targetX - footprintWidth / 2}
                    y="157"
                    width={footprintWidth}
                    height="6"
                    fill="#38bdf8"
                    opacity="0.8"
                    rx="2"
                  />
                  <text
                    x={targetX - 45}
                    y="145"
                    fill="#e0f2fe"
                    font-size="10"
                    font-family="monospace"
                    font-weight="bold"
                  >
                    {isId ? `Jejak Sinar: ${beamSpread}× Luas` : `Footprint: ${beamSpread}× Area`}
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Climate Zone Classification Readout */}
      <div class="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span class={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${zoneColor}`}>
            {zoneName}
          </span>
          <span class="text-xs font-mono text-[var(--color-text-dim)]">
            {isId ? 'Lintang: ' : 'Latitude: '}{latitude}°
          </span>
        </div>

        <p class="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed font-medium">
          {zoneDescription}
        </p>

        <div class="text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
          <strong class="text-[var(--color-text)]">{isId ? 'Referensi Wilayah: ' : 'Regional Reference: '}</strong>
          {regionalExample}
        </div>
      </div>
    </div>
  );
}
