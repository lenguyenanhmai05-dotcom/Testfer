export default function Home() {
  return (
    <div className="relative min-h-screen bg-mesh overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />

      <section className="relative pt-32 pb-20 px-6 sm:pt-48 sm:pb-32 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-bold tracking-widest uppercase text-brand-primary">
            Introducing Nexter
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none animate-float">
            Crafting Digital <br />
            <span className="text-gradient">Experiences</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-muted leading-relaxed">
            Build stunning, high-performance web applications with our premium Next.js starter. 
            Experience the future of design with glassmorphism and Tailwind v4.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold shadow-premium hover:scale-105 transition-all w-full sm:w-auto cursor-pointer">
              Get Started Now
            </button>
            <button className="px-8 py-4 rounded-xl glass border border-white/10 font-bold hover:bg-white/5 transition-all w-full sm:w-auto cursor-pointer">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid Shortcut */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Lightning Fast", desc: "Optimized for speed and performance out of the box." },
            { title: "Glassmorphism", desc: "Modern UI elements with sleek blur effects." },
            { title: "Tailwind v4", desc: "Leveraging the latest styling engine for developers." }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
              <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary transition-colors">{feature.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
