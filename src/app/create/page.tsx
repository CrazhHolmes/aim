'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Music, Zap, Clock, Loader2 } from 'lucide-react'

const GENRES = [
  { id: 'lo-fi', label: 'Lo-Fi', icon: '🎧' },
  { id: 'electronic', label: 'Electronic', icon: '⚡' },
  { id: 'orchestral', label: 'Orchestral', icon: '🎻' },
  { id: 'rock', label: 'Rock', icon: '🎸' },
  { id: 'jazz', label: 'Jazz', icon: '🎷' },
  { id: 'ambient', label: 'Ambient', icon: '🌙' },
  { id: 'hip-hop', label: 'Hip-Hop', icon: '🎤' },
  { id: 'cinematic', label: 'Cinematic', icon: '🎬' },
]

const MOODS = [
  { id: 'uplifting', label: 'Uplifting', color: 'from-yellow-400 to-orange-500' },
  { id: 'chill', label: 'Chill', color: 'from-cyan-400 to-blue-500' },
  { id: 'dark', label: 'Dark', color: 'from-purple-600 to-violet-900' },
  { id: 'energetic', label: 'Energetic', color: 'from-red-500 to-pink-500' },
  { id: 'melancholic', label: 'Melancholic', color: 'from-blue-600 to-indigo-900' },
  { id: 'epic', label: 'Epic', color: 'from-amber-500 to-red-600' },
]

const DURATIONS = [
  { seconds: 30, label: '30 sec', credits: 1 },
  { seconds: 60, label: '1 min', credits: 2 },
  { seconds: 120, label: '2 min', credits: 3 },
]

export default function CreatePage() {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [genre, setGenre] = useState<string | null>(null)
  const [mood, setMood] = useState<string | null>(null)
  const [duration, setDuration] = useState(30)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedDuration = DURATIONS.find(d => d.seconds === duration)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }

      // Check credits
      const { data: credits } = await (supabase.rpc as any)('get_user_credits', { uid: user.id })
      const requiredCredits = selectedDuration?.credits || 1

      if ((credits || 0) < requiredCredits) {
        setError(`Not enough credits. You need ${requiredCredits} credits but have ${credits || 0}.`)
        setLoading(false)
        return
      }

      // Create track record
      const { data: track, error: trackError } = await supabase
        .from('tracks')
        .insert({
          user_id: user.id,
          title: title || 'Untitled Track',
          prompt,
          genre,
          mood,
          duration_seconds: duration,
          status: 'queued',
        })
        .select()
        .single()

      if (trackError) throw trackError

      // Deduct credits
      const { error: creditError } = await supabase
        .from('credit_ledger')
        .insert({
          user_id: user.id,
          delta: -requiredCredits,
          reason: 'track_generation',
          track_id: track.id,
        })

      if (creditError) throw creditError

      // Redirect to dashboard
      router.push('/dashboard')

    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-8 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-chrome-400 hover:text-chrome-100 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold mb-2">
            Create New <span className="gradient-text">Track</span>
          </h1>
          <p className="text-chrome-400">
            Describe your vision and our AI will compose it for you
          </p>
        </div>

        <form onSubmit={handleCreate} className="space-y-10">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-chrome-300 mb-2">
              Track Title (optional)
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Track"
              className="w-full px-4 py-3 bg-void-800 border border-white/10 rounded-xl text-chrome-100 placeholder:text-chrome-400/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all"
            />
          </div>

          {/* Prompt */}
          <div>
            <label htmlFor="prompt" className="flex items-center gap-2 text-sm font-medium text-chrome-300 mb-2">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              Describe your track
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A chill lo-fi beat with warm piano chords, soft drums, and a nostalgic summer vibe. Perfect for late night studying..."
              rows={4}
              required
              className="w-full px-4 py-3 bg-void-800 border border-white/10 rounded-xl text-chrome-100 placeholder:text-chrome-400/50 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all resize-none"
            />
            <p className="mt-2 text-chrome-400 text-sm">
              Be specific! Mention instruments, tempo, mood, and what you want to use it for.
            </p>
          </div>

          {/* Genre */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-chrome-300 mb-4">
              <Music className="w-4 h-4 text-neon-purple" />
              Genre (optional)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {GENRES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGenre(genre === g.id ? null : g.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    genre === g.id
                      ? 'border-neon-cyan bg-neon-cyan/10 text-chrome-100'
                      : 'border-white/10 bg-void-800 text-chrome-400 hover:border-white/20'
                  }`}
                >
                  <div className="text-2xl mb-2">{g.icon}</div>
                  <div className="text-sm font-medium">{g.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-chrome-300 mb-4">
              <Zap className="w-4 h-4 text-neon-pink" />
              Mood (optional)
            </label>
            <div className="flex flex-wrap gap-3">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(mood === m.id ? null : m.id)}
                  className={`px-5 py-2 rounded-full border transition-all ${
                    mood === m.id
                      ? 'border-transparent text-white'
                      : 'border-white/10 bg-void-800 text-chrome-400 hover:border-white/20'
                  }`}
                  style={mood === m.id ? {
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  } : {}}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-chrome-300 mb-4">
              <Clock className="w-4 h-4 text-neon-blue" />
              Duration
            </label>
            <div className="flex gap-4">
              {DURATIONS.map((d) => (
                <button
                  key={d.seconds}
                  type="button"
                  onClick={() => setDuration(d.seconds)}
                  className={`flex-1 p-4 rounded-xl border transition-all ${
                    duration === d.seconds
                      ? 'border-neon-cyan bg-neon-cyan/10'
                      : 'border-white/10 bg-void-800 hover:border-white/20'
                  }`}
                >
                  <div className={`font-display text-lg font-semibold mb-1 ${
                    duration === d.seconds ? 'text-neon-cyan' : 'text-chrome-200'
                  }`}>
                    {d.label}
                  </div>
                  <div className="text-chrome-400 text-sm">
                    {d.credits} credit{d.credits > 1 ? 's' : ''}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="pt-6 border-t border-white/5">
            <button
              type="submit"
              disabled={loading || !prompt}
              className="w-full py-4 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-xl font-display font-bold text-lg text-void-950 hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Generate Track ({selectedDuration?.credits} credit{selectedDuration?.credits !== 1 ? 's' : ''})
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
