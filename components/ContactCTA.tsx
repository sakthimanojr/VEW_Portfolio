import CallButton from './CallButton';
import WhatsAppButton from './WhatsAppButton';
import Reveal from './Reveal';

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="steel-texture pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-edge relative flex flex-col items-center gap-7 py-20 text-center md:py-24">
        <Reveal>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Let&rsquo;s Build Something Strong.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-md text-base text-white/75 sm:text-lg">
            Have a fabrication requirement? Talk to our team.
          </p>
        </Reveal>
        <Reveal delay={160} className="flex flex-col gap-3.5 sm:flex-row">
          <CallButton variant="dark" label="Call Us" />
          <WhatsAppButton variant="primary" label="WhatsApp Us" />
        </Reveal>
      </div>
    </section>
  );
}
