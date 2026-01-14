'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-chrome-400 hover:text-chrome-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Auth card */}
        <div className="glass rounded-2xl p-8">
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold mb-2">
                  Welcome to <span className="gradient-text">AiM</span>
                </h1>
                <p className="text-chrome-400">
                  Sign in with your email to start creating
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-chrome-300 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-chrome-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-void-800 border border-white/10 rounded-xl text-chrome-100 placeholder:text-chrome-400/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-xl font-display font-semibold text-void-950 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Magic Link'
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-chrome-400 text-sm">
                We'll send you a magic link to sign in instantly.
                <br />No password needed.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neon-cyan/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-neon-cyan" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">Check your email</h2>
              <p className="text-chrome-400 mb-6">
                We sent a magic link to<br />
                <span className="text-chrome-100 font-medium">{email}</span>
              </p>
              <button
                onClick={() => {
                  setSent(false)
                  setEmail('')
                }}
                className="text-neon-cyan hover:underline text-sm"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>

        {/* Bonus info */}
        <div className="mt-6 text-center text-chrome-400 text-sm">
          🎁 New users get <span className="text-neon-cyan font-semibold">10 free credits</span> to start
        </div>
      </div>
    </main>
  )
}
