"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles } from "lucide-react"

interface BusinessInfo {
  businessType: string
  location: string
}

interface Persona {
  name: string
  age: number
  occupation: string
  goals: string
  painPoints: string
  searchBehavior: string
}

interface Keyword {
  persona: string
  variations: string[]
}

export default function Home() {
  const [step, setStep] = useState<"business" | "personas" | "keywords" | "blog">("business")
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({ businessType: "", location: "" })
  const [personas, setPersonas] = useState<Persona[]>([])
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-personas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessInfo),
      })

      const data = await response.json()
      setPersonas(data.personas)
      setStep("personas")
    } catch (error) {
      console.error("Error generating personas:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateKeywords = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personas, businessInfo }),
      })

      const data = await response.json()
      setKeywords(data.keywords)
      setStep("keywords")
    } catch (error) {
      console.error("Error generating keywords:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ContentAI</h1>
              <p className="text-sm text-gray-600">Keyword Research & Blog Writer</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {["Business Info", "Personas", "Keywords", "Blog"].map((label, index) => {
              const stepValues = ["business", "personas", "keywords", "blog"]
              const currentIndex = stepValues.indexOf(step)
              const isActive = index <= currentIndex

              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                        isActive ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className={`mt-2 text-xs font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`h-0.5 flex-1 -mt-8 transition-colors ${
                        index < currentIndex ? "bg-black" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: Business Info Form */}
        {step === "business" && (
          <div className="border border-gray-200 rounded-lg bg-white p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-balance">Tell us about your business</h2>
              <p className="text-gray-600 text-sm mt-2">
                We'll use this information to create customer personas and find the best keywords for your content
              </p>
            </div>
            <form onSubmit={handleBusinessSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-900">
                  What type of business do you have?
                </label>
                <input
                  id="businessType"
                  placeholder="e.g., Bakery, Real Estate Agency, Coffee Shop"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={businessInfo.businessType}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, businessType: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-900">
                  Where is your business located?
                </label>
                <input
                  id="location"
                  placeholder="e.g., Sydney, Nagpur, New York"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={businessInfo.location}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, location: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Generating Personas...
                  </>
                ) : (
                  <>
                    Generate Customer Personas
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Personas Display */}
        {step === "personas" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Customer Personas</h2>
              <p className="text-gray-600">
                We've created {personas.length} potential customer profiles based on your business
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {personas.map((persona, index) => (
                <div key={index} className="border border-gray-200 rounded-lg bg-white p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{persona.name}</h3>
                    <p className="text-sm text-gray-600">
                      {persona.age} years old • {persona.occupation}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Goals</h4>
                      <p className="text-sm text-gray-600">{persona.goals}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Pain Points</h4>
                      <p className="text-sm text-gray-600">{persona.painPoints}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Search Behavior</h4>
                      <p className="text-sm text-gray-600">{persona.searchBehavior}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerateKeywords}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Generating Keywords...
                </>
              ) : (
                <>
                  Generate Keywords from Personas
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 3: Keywords Display */}
        {step === "keywords" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Keyword Research Results</h2>
              <p className="text-gray-600">Here are different ways your customers might search for your business</p>
            </div>

            <div className="space-y-6">
              {keywords.map((keywordGroup, index) => (
                <div key={index} className="border border-gray-200 rounded-lg bg-white p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{keywordGroup.persona}</h3>
                  <div className="flex flex-wrap gap-2">
                    {keywordGroup.variations.map((keyword, kIndex) => (
                      <div
                        key={kIndex}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md text-sm font-medium"
                      >
                        {keyword}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep("blog")}
              className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue to Blog Writer
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Blog Writer */}
        {step === "blog" && <BlogWriter keywords={keywords} businessInfo={businessInfo} />}
      </main>
    </div>
  )
}

function BlogWriter({ keywords, businessInfo }: { keywords: Keyword[]; businessInfo: BusinessInfo }) {
  const [topic, setTopic] = useState("")
  const [blogContent, setBlogContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const allKeywords = keywords.flatMap((k) => k.variations)

  const handleGenerateBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setBlogContent("")

    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, keywords: allKeywords, businessInfo }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          setBlogContent((prev) => prev + chunk)
        }
      }
    } catch (error) {
      console.error("Error generating blog:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Writer</h2>
        <p className="text-gray-600">Create SEO-optimized blog content using your researched keywords</p>
      </div>

      <div className="border border-gray-200 rounded-lg bg-white p-6">
        <h3 className="font-bold text-gray-900 mb-2">Your Keywords</h3>
        <p className="text-gray-600 text-sm mb-4">These will be incorporated into your blog post</p>
        <div className="flex flex-wrap gap-2">
          {allKeywords.map((keyword, index) => (
            <div key={index} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium">
              {keyword}
            </div>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg bg-white p-6">
        <h3 className="font-bold text-gray-900 mb-4">Generate Blog Post</h3>
        <form onSubmit={handleGenerateBlog} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-900">
              What topic would you like to write about?
            </label>
            <input
              id="topic"
              placeholder="e.g., Best practices for choosing a bakery in Sydney"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                Writing Blog Post...
              </>
            ) : (
              <>
                Generate Blog Post
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {blogContent && (
        <div className="border border-gray-200 rounded-lg bg-white p-6">
          <h3 className="font-bold text-gray-900 mb-4">Your Blog Post</h3>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{blogContent}</div>
        </div>
      )}
    </div>
  )
}
