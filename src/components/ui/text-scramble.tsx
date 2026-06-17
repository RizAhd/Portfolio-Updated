"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

interface TextScrambleProps {
  text: string
  className?: string
  autoPlay?: boolean
}

export function TextScramble({ text, className = "", autoPlay = false }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frameRef = useRef(0)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    frameRef.current = 0
    const duration = text.length * 3

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      frameRef.current++
      const progress = frameRef.current / duration
      const revealedLength = Math.floor(progress * text.length)

      const newText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " "
          if (i < revealedLength) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")

      setDisplayText(newText)

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, 30)
  }, [text])

  useEffect(() => {
    if (autoPlay) scramble()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoPlay, scramble])

  // Group characters by word so the line only ever breaks at spaces (each word
  // stays intact), while every character still animates individually.
  const nodes: React.ReactNode[] = []
  let cursor = 0
  text.split(" ").forEach((word, wi) => {
    if (wi > 0) {
      nodes.push(<span key={`sp-${wi}`}> </span>)
      cursor += 1
    }
    const start = cursor
    const wordSpans = word.split("").map((_, k) => {
      const idx = start + k
      const char = displayText[idx] ?? text[idx]
      const scrambled = isScrambling && char !== text[idx]
      return (
        <span
          key={idx}
          className={`inline-block transition-transform duration-150 ${
            scrambled ? "scale-110 text-yellow-400" : ""
          }`}
          style={{ transitionDelay: `${idx * 8}ms` }}
        >
          {char}
        </span>
      )
    })
    cursor += word.length
    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {wordSpans}
      </span>,
    )
  })

  return (
    <span
      className={`inline select-none ${className}`}
      onMouseEnter={scramble}
    >
      {nodes}
    </span>
  )
}
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
