"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { TypeAnimation } from "~/components/typeAnimation";
import { ColorOverlay } from "~/components/colorOverlay";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STANDARD_WAIT = 1800;

const text: Sequence = [
  "Happy Birthday, Hailey.",
  STANDARD_WAIT,
  "",
  STANDARD_WAIT,
  "Listen, I know you miss me.",
  STANDARD_WAIT,
  "",
  STANDARD_WAIT,
  "It hurts me knowing how much it must be hurting you.",
  STANDARD_WAIT,
  "",
  STANDARD_WAIT,
  "I mean, you were OBSESSED with me",
  STANDARD_WAIT / 2,
  "I mean, you were OBSESSED with me, and then I just disappeared?",
  STANDARD_WAIT,
  "",
  STANDARD_WAIT,
  "That was harsh.",
  STANDARD_WAIT / 2,
  "That was harsh. Especially to my #2 fan.",
  STANDARD_WAIT,
  "",
  STANDARD_WAIT,
  "So, for your birthday, I thought I would give you the one thing you can't live without.",
  STANDARD_WAIT,
];

type Sequence = (
  | string
  | number
  | ((element: HTMLElement | null) => void | Promise<void>)
)[];

const HomeContent = () => {
  const [finishedTyping, setFinishedTyping] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (finishedTyping) {
      router.prefetch("/auth/signin");
    }
  }, [finishedTyping, router]);
  return (
    <>
      <main className="container mx-auto flex h-screen items-center justify-center p-8 h-screen-ios">
        <AnimatePresence>
          {!finishedTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 2, duration: 2 } }}
              exit={{ opacity: 0 }}
              className="absolute right-5 top-5 bg-background"
            >
              <Button onClick={() => setFinishedTyping(true)} variant="outline">
                Skip
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div>
          <AnimatePresence>
            {finishedTyping ? (
              <motion.div
                key={1}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <Button asChild>
                  <Link href="/api/auth/signin" prefetch>
                    Sign in
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={2}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <TypeAnimation
                  className="font-display font-light"
                  sequence={([4000] as Sequence).concat(
                    text.concat([() => setFinishedTyping(true)]),
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <ColorOverlay />
    </>
  );
};

export default HomeContent;
