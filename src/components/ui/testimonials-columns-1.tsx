import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface ColumnCard {
  text: React.ReactNode;
  name: string;
  role: string;
  image?: string;
  icon?: LucideIcon;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: ColumnCard[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, icon: Icon, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border border-border bg-card shadow-lg shadow-primary/10 max-w-xs w-full"
                  key={i}
                >
                  <div className="text-sm leading-relaxed text-foreground/80">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    {image ? (
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : Icon ? (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/15 text-yellow-600">
                        <Icon className="h-5 w-5" />
                      </span>
                    ) : null}
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-foreground">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
