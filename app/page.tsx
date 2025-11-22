"use client"

import { Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { GradientButton } from "@/components/gradient-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ContentAI</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keyword Research & Blog Writer</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content  */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center space-y-8 max-w-2xl">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              AI-Powered Content Creation
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Generate customer personas, research keywords, and create SEO-optimized blog content all in one place.
            </p>
          </div>
          
          <div className="pt-4">
            <GradientButton href="/app">
              Get Started
            </GradientButton>
          </div>
        </div>
      </main>
    </div>
  )
}