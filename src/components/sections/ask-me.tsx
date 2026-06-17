import { useState } from 'react';
import { motion } from 'framer-motion';
import { PromptBox } from '@/components/ui/chatgpt-prompt-input';

export const AskMe = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = new FormData(event.currentTarget).get('message');
    const hasImage = !!event.currentTarget.querySelector('img');
    if (!String(message ?? '').trim() && !hasImage) return;
    setSent(true);
  };

  return (
    <section
      id="ask"
      className="w-full bg-secondary px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12 md:px-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 sm:gap-8 md:gap-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
        >
          How Can I Help You
          <span className="text-yellow-500">?</span>
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full"
        >
          <PromptBox name="message" aria-label="Ask me anything" />
        </motion.form>

        <motion.a
          href="https://wa.me/94784342391"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] sm:text-base"
          aria-label="Chat with me on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Chat on WhatsApp
        </motion.a>

        {sent && (
          <p className="max-w-full text-balance text-center text-sm text-muted-foreground" role="status">
            Thanks! For a real reply, reach me via the{' '}
            <a href="#contact" className="font-medium text-yellow-600 underline-offset-4 hover:underline">
              contact section
            </a>{' '}
            below.
          </p>
        )}
      </div>
    </section>
  );
};
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
