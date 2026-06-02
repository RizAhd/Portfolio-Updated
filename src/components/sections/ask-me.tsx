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
      className="w-full bg-secondary px-4 py-24 sm:px-6 md:px-12 md:py-32"
    >
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-8 md:gap-10">
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

        {sent && (
          <p className="text-center text-sm text-muted-foreground" role="status">
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
