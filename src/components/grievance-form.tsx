"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { HeartIcon, SendIcon, SmileIcon } from "lucide-react"
import { submitGrievance } from "@/app/actions"
import Image from "next/image"

export default function GrievanceForm() {
  const [grievance, setGrievance] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!grievance.trim()) {
      setError("Please share your thoughts with me")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      const result = await submitGrievance(grievance)
      if (result.success) {
        setIsSubmitted(true)
        setGrievance("")
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err: unknown) {
      console.error("Unexpected client-side error during submit:", err)
      if (err instanceof Error) {
        setError(err.message || "An unexpected client-side error occurred. Please try again.")
      } else {
        setError("An unexpected client-side error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-pink-200">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
            <HeartIcon className="h-8 w-8 text-rose-500" />
          </div>
          <h3 className="text-lg font-medium text-rose-700 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your message has been sent. I&apos;ll respond to your feedback as soon as possible.
          </p>
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-rose-300">
              <Image
                src="/images/person1.jpeg"
                alt="Playful expression"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 64px, 64px"
              />
            </div>
          </div>
          <Button
            variant="outline"
            className="border-pink-300 text-rose-600 hover:bg-pink-50"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-pink-200">
      <div className="space-y-4">
        <div>
          <Label htmlFor="grievance" className="block text-sm font-medium text-rose-700 mb-2">
            My apologies for causing you dissatisfaction. Please file a grievance for a prompt response
          </Label>
          <Textarea
            id="grievance"
            value={grievance}
            onChange={(e) => setGrievance(e.target.value)}
            placeholder="Share your thoughts with me..."
            className="min-h-[120px] border-pink-200 focus:border-rose-400 focus:ring-rose-400"
          />
          <div className="text-xs text-right mt-1 pr-1 text-gray-500">
            {grievance.length}/1600
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full bg-rose-500 hover:bg-rose-600 text-white">
          {isSubmitting ? (
            "Sending..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              <SendIcon className="h-4 w-4" />
              Send Message
            </span>
          )}
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-center gap-2">
        <SmileIcon className="h-4 w-4 text-rose-400" />
        <p className="text-sm text-rose-600">With love and care, I&apos;m here to listen 💖</p>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-rose-300">
          <Image
            src="/images/person2.jpeg"
            alt="Playful expression"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 48px, 48px"
          />
        </div>
      </div>
    </form>
  )
} 