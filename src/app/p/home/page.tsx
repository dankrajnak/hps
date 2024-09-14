"use client";
import { Card } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Wand2, ArrowUp, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { api } from "~/trpc/react";

export default function Home() {
  const [gotPicture, setGotPicture] = useState<string | undefined>(undefined);
  const [text, setText] = useState<string>("");

  const getImage = api.image.generateImage.useMutation({
    onSuccess: async (resp) => {
      setGotPicture(resp.images[0]?.url);
    },
  });

  const isGettingImage = getImage.isPending;

  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center py-10">
        {gotPicture && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "24rem",
              opacity: 1,
              transition: {
                ease: "easeInOut",
                duration: 2,
              },
            }}
            className="w-full max-w-[36rem]"
          >
            <Card className="m-0 h-full overflow-hidden">
              <Image
                src={gotPicture}
                alt="an image of dan according to the prompt"
                width={1048}
                height={1048}
              />
            </Card>
          </motion.div>
        )}
        <Card className="mt-8 w-full max-w-[36rem] p-8">
          <div className="focus-within:ing-1 rounded ring-neutral-500">
            <Textarea
              rows={5}
              placeholder="Describe dan doing something. For example, 'dan going to the movies', 'dan eating gelato' ..."
              className="resize-none rounded-b-none border-b-0"
              value={text}
              disabled={isGettingImage}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex w-full justify-end gap-2 rounded rounded-t-none border border-t-0 border-neutral-200 bg-neutral-100 p-2 ring-0 ring-neutral-500 peer-focus-within:ring-1">
              <Button size="sm" variant="outline" disabled={isGettingImage}>
                <Wand2 size={15} />
              </Button>
              <Button
                size="sm"
                disabled={isGettingImage}
                onClick={() =>
                  getImage.mutate({
                    prompt: text,
                  })
                }
              >
                {isGettingImage ? (
                  <LoaderCircle size={15} className="animate-spin" />
                ) : (
                  <ArrowUp size={15} />
                )}
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
