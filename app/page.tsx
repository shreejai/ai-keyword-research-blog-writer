import Link from "next/link"
import { Search, Users, PenTool, ArrowRight, Sparkles, Zap, CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-linear-to-br from-blue-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            Content<span className="text-transparent bg-clip-text bg-linear-to-br from-blue-400 via-blue-500 to-purple-600">AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Now with GPT-4o Integration
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Master your content <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-500 to-purple-600">
                in seconds with <span className="text-transparent bg-clip-text bg-linear-to-tl from-cyan-500 to-orange-500">AI</span>.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Stop guessing what your customers want. Generate detailed personas, discover high-impact keywords, and
              write SEO-optimized blogs automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/login"
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
              >
                Start Writing for Free <ArrowRight className="w-4 h-4" />
              </Link>
              {/* <a
                href="#demo"
                className="w-full sm:w-auto h-12 px-8 rounded-full border border-white/10 bg-white/5 text-white font-medium flex items-center justify-center hover:bg-white/10 transition-all"
              >
                Watch Demo
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid (Bento Box Style) */}
      <section id="features" className="py-24 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to rank</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A complete suite of tools designed to take you from raw idea to published article without ever leaving the
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 overflow-hidden relative group hover:border-white/20 transition-colors">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">Deep Persona Analysis</h3>
                <p className="text-gray-400 max-w-md">
                  Input your business details and let our AI construct detailed buyer personas. Understand their pain
                  points, motivations, and demographics instantly.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent" />
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 relative group hover:border-white/20 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">Keyword Discovery</h3>
                <p className="text-gray-400">
                  Find the exact search terms your personas are using. Uncover hidden long-tail opportunities.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 relative group hover:border-white/20 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <PenTool className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Auto-Blog Writer</h3>
                <p className="text-gray-400">
                  Turn keywords into full-length, formatted blog posts with a single click. SEO-optimized out of the
                  box.
                </p>
              </div>
            </div>

            {/* Feature 4 - Large */}
            <div className="md:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 relative group hover:border-white/20 transition-colors flex flex-col justify-center">
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold">Enterprise-Grade Quality</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {["GPT-4o Powered", "SEO Metadata Included", "Plagiarism Free", "Markdown Export"].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              Content<span className="text-blue-500">AI</span>
            </div>
            <p className="text-gray-500 text-sm">© 2025 ContentAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
