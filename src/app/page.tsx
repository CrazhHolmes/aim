import Link from 'next/link'
import { Zap, Music, Sparkles, ArrowRight, Play } from 'lucide-react'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-7xl md:text-9xl font-black tracking-tight">
              <span className="gradient-text">AiM</span>
            </h1>
            <p className="text-chrome-400 text-lg tracking-[0.3em] uppercase mt-2">
              AI Music Creation
            </p>
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-4xl text-chrome-200 font-light mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Describe your vision.<br />
            <span className="text-neon-cyan">Generate your sound.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link 
              href="/auth"
              className="group relative px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-xl font-display font-semibold text-void-950 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Start Creating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button className="group px-8 py-4 glass rounded-xl font-display font-semibold text-chrome-100 hover:border-neon-cyan/50 transition-all duration-300">
              <span className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Listen to Samples
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {[
              { value: '10', label: 'Free Credits' },
              { value: '30s', label: 'Generation Time' },
              { value: '∞', label: 'Possibilities' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl md:text-5xl font-bold text-neon-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-chrome-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-chrome-400/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-chrome-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-20">
            How It <span className="text-neon-pink">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Describe',
                description: 'Tell us what you want. A chill lo-fi beat? Epic orchestral? Dark synthwave? Just type it.',
                color: 'neon-cyan',
              },
              {
                icon: Zap,
                title: 'Generate',
                description: 'Our AI composes a unique track based on your prompt. Takes about 30 seconds.',
                color: 'neon-purple',
              },
              {
                icon: Music,
                title: 'Download',
                description: 'Get your track instantly. Full ownership. Use it anywhere you want.',
                color: 'neon-pink',
              },
            ].map((feature, i) => (
              <div 
                key={feature.title}
                className="group p-8 glass rounded-2xl hover:border-neon-cyan/30 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                <div className="font-display text-xl font-semibold mb-3">{feature.title}</div>
                <p className="text-chrome-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Create?
            </h2>
            <p className="text-chrome-300 text-lg mb-10 max-w-xl mx-auto">
              Sign up free and get 10 credits to generate your first tracks. No credit card required.
            </p>
            <Link 
              href="/auth"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl font-display font-bold text-lg text-white hover:shadow-[0_0_40px_rgba(255,0,245,0.4)] transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-2xl font-bold gradient-text">AiM</div>
          <div className="text-chrome-400 text-sm">
            © 2025 AiM. Create music with AI.
          </div>
        </div>
      </footer>
    </main>
  )
}
