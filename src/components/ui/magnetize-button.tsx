"use client"

import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

import { cn } from "@/lib/utils"

interface Particle {
  id: number
  x: number
  y: number
}

interface MagnetizeButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  particleCount?: number
  spread?: number
  particleClassName?: string
  children: React.ReactNode
}

function MagnetizeButton({
  className,
  particleCount = 12,
  spread = 180,
  particleClassName,
  children,
  href,
  ...props
}: MagnetizeButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const particlesControl = useAnimation()

  useEffect(() => {
    const next = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * spread * 2 - spread,
      y: Math.random() * spread * 2 - spread,
    }))
    setParticles(next)
  }, [particleCount, spread])

  const handleStart = useCallback(async () => {
    setIsAttracting(true)
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    })
  }, [particlesControl])

  const handleEnd = useCallback(async () => {
    setIsAttracting(false)
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }))
  }, [particlesControl, particles])

  const inner = (
    <>
      {particles.map((_, index) => (
        <motion.span
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full transition-opacity duration-300",
            particleClassName ?? "bg-violet-400 dark:bg-violet-300",
            isAttracting ? "opacity-100" : "opacity-40",
          )}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  )

  const shared = {
    className: cn(
      "relative inline-flex touch-none items-center justify-center transition-colors duration-300",
      className,
    ),
    onMouseEnter: handleStart,
    onMouseLeave: handleEnd,
    onTouchStart: handleStart,
    onTouchEnd: handleEnd,
  }

  if (href) {
    return (
      <a href={href} {...shared} {...props}>
        {inner}
      </a>
    )
  }

  return (
    <button type="button" {...shared} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  )
}

export { MagnetizeButton }
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
