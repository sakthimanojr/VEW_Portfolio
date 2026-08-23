import Reveal from './Reveal';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: 'Skilled', label: 'Fabricators & Welders' },
  { value: 'MS·SS·GI', label: 'Materials Worked' },
];

export default function Stats() {
  return (
    <section className="border-y border-black/5 bg-white">
      <div className="container-edge grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center md:text-left">
            <p className="font-display text-3xl font-black text-primary sm:text-4xl">{s.value}</p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink/60 sm:text-sm">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
