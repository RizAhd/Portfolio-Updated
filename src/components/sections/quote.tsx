import DotPattern from '@/components/ui/dot-pattern-1';
import { Typewriter } from '@/components/ui/typewriter';

// Six punchy quotes from some of the best minds — cycled with a typewriter effect.
const QUOTES = [
  'Stay hungry. Stay foolish. — Steve Jobs',
  'The best way to predict the future is to invent it. — Alan Kay',
  'Talk is cheap. Show me the code. — Linus Torvalds',
  'Simplicity is the ultimate sophistication. — Leonardo da Vinci',
  'Make it work, make it right, make it fast. — Kent Beck',
  'First, solve the problem. Then, write the code. — John Johnson',
];

/**
 * Quote band — a dot-pattern framed card where a typewriter cycles through
 * famous quotes (gold accent, light/dark-safe). A reserved min-height keeps
 * the layout from jumping as lines type and delete.
 */
export const Quote = () => (
  <section id="quote" className="w-full bg-background py-12 sm:py-16 md:py-24">
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="relative flex flex-col items-center border border-yellow-500/50">
        <DotPattern width={6} height={6} className="fill-yellow-500/15 md:fill-yellow-500/25" />

        {/* corner markers */}
        <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-yellow-500" />
        <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-yellow-500" />
        <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-yellow-500" />
        <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-yellow-500" />

        <div className="relative z-20 mx-auto w-full px-4 py-10 text-center sm:px-6 sm:py-12 md:px-12 md:py-16">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-yellow-600 sm:text-xs sm:tracking-[0.3em] md:text-sm">
            Words I live by
          </p>

          <blockquote className="mt-5 sm:mt-6">
            <p className="mx-auto flex min-h-[9rem] max-w-3xl items-start justify-center text-[clamp(1.2rem,4.2vw,2.1rem)] font-medium leading-[1.35] tracking-tight text-foreground sm:min-h-[8rem] md:min-h-[7rem]">
              <Typewriter
                text={QUOTES}
                speed={45}
                deleteSpeed={22}
                waitTime={2200}
                className="text-foreground"
                cursorChar="|"
                cursorClassName="ml-0.5 text-yellow-500"
              />
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
);

export default Quote;
