import { SiteHeader } from "@/components/site-header";
import { MarketingCtas } from "@/components/marketing-ctas";
import { TEMPLATE_METAS } from "@/templates/meta";

export default function MarketingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(111,158,78,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(196,240,130,0.12), transparent 50%), linear-gradient(180deg, #0f1410 0%, #152018 45%, #0c110d 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />

      <SiteHeader />

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-center px-6 pb-20 pt-10 md:px-10">
          <p className="font-display text-5xl leading-none tracking-tight text-sand md:text-7xl lg:text-8xl">
            SiteForge
          </p>
          <h1 className="mt-6 max-w-2xl text-2xl font-medium leading-snug text-foreground md:text-3xl">
            Your business. A real website. Live in minutes.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Enter your details, pick a template built for your industry, and publish a site you can
            share today — then download it whenever you want.
          </p>
          <MarketingCtas />
        </section>

        <section className="relative z-10 border-t border-border bg-surface/60 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl text-sand md:text-4xl">Templates for every trade</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Twelve distinct designs — cafe, salon, trades, clinic, and more — all powered by the
              same business details you provide.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TEMPLATE_METAS.map((t) => (
                <div key={t.id} className="overflow-hidden border border-border bg-background/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.thumbnail} alt="" className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wider text-accent">{t.category}</p>
                    <p className="mt-1 font-display text-xl text-sand">{t.name}</p>
                    <p className="mt-1 text-sm text-muted">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative z-10 border-t border-border px-6 py-10 text-sm text-muted md:px-10">
          <div className="mx-auto flex max-w-6xl justify-between gap-4">
            <span className="font-display text-sand">SiteForge</span>
            <span>Build · Publish · Download</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
