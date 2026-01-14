import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Music, Coins, LogOut, Clock, Download } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user credits
  const { data: credits } = await (supabase.rpc as any)('get_user_credits', { uid: user.id })

  // Get user tracks
  const { data: tracks } = await supabase
    .from('tracks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/5 bg-void-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold gradient-text">
            AiM
          </Link>
          
          <div className="flex items-center gap-6">
            {/* Credits display */}
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
              <Coins className="w-4 h-4 text-neon-cyan" />
              <span className="font-display font-semibold text-neon-cyan">
                {credits ?? 0}
              </span>
              <span className="text-chrome-400 text-sm">credits</span>
            </div>

            {/* User menu */}
            <div className="flex items-center gap-4">
              <span className="text-chrome-300 text-sm">
                {profile?.display_name || user.email}
              </span>
              <form action={handleSignOut}>
                <button 
                  type="submit"
                  className="p-2 text-chrome-400 hover:text-chrome-100 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome section */}
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-2">
            Welcome back, <span className="text-neon-cyan">{profile?.display_name || 'Creator'}</span>
          </h1>
          <p className="text-chrome-400">
            Ready to create something amazing?
          </p>
        </div>

        {/* Create new track CTA */}
        <Link
          href="/create"
          className="block mb-12 p-8 glass rounded-2xl hover:border-neon-cyan/30 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-neon-cyan/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-neon-cyan" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold mb-1">Create New Track</h2>
              <p className="text-chrome-400">Describe your vision and let AI compose it</p>
            </div>
          </div>
        </Link>

        {/* Recent tracks */}
        <section>
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <Music className="w-6 h-6 text-neon-purple" />
            Your Tracks
          </h2>

          {tracks && tracks.length > 0 ? (
            <div className="grid gap-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="p-6 glass rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Status indicator */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      track.status === 'completed' ? 'bg-green-500/10' :
                      track.status === 'processing' ? 'bg-neon-cyan/10' :
                      track.status === 'failed' ? 'bg-red-500/10' :
                      'bg-chrome-400/10'
                    }`}>
                      {track.status === 'completed' ? (
                        <Music className="w-6 h-6 text-green-500" />
                      ) : track.status === 'processing' ? (
                        <Clock className="w-6 h-6 text-neon-cyan animate-spin" />
                      ) : (
                        <Music className="w-6 h-6 text-chrome-400" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-chrome-100">{track.title}</h3>
                      <p className="text-chrome-400 text-sm truncate max-w-md">
                        {track.prompt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      track.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                      track.status === 'processing' ? 'bg-neon-cyan/10 text-neon-cyan' :
                      track.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                      'bg-chrome-400/10 text-chrome-400'
                    }`}>
                      {track.status}
                    </span>

                    {track.status === 'completed' && track.audio_url && (
                      <a
                        href={track.audio_url}
                        download
                        className="p-2 text-neon-cyan hover:bg-neon-cyan/10 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-chrome-400/10 flex items-center justify-center">
                <Music className="w-8 h-8 text-chrome-400" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">No tracks yet</h3>
              <p className="text-chrome-400 mb-6">Create your first AI-generated track</p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-xl font-display font-semibold text-void-950"
              >
                <Plus className="w-5 h-5" />
                Create Track
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
