import * as fal from "@fal-ai/serverless-client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export type ImageOutput = {
  images: {
    url: string;
    width: number;
    height: number;
    content_type: string;
  }[];
  has_nsfw_concepts: boolean[];
  prompt: string;
};

const imageSchema = z.object({
  images: z.array(
    z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
      content_type: z.string(),
    }),
  ),
  has_nsfw_concepts: z.array(z.boolean()),
  prompt: z.string(),
});

const wait = (ms: number) =>
  new Promise((res) => setTimeout(() => res(null), ms));

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const memo = <P extends any[], R, T extends (...args: P) => R>(func: T): T => {
  let result: R;

  return ((...args: P) => {
    if (!result) {
      result = func(...args);
    }
    return result;
  }) as T;
};

export const imageRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      // await wait(20000);

      const result = await fal.subscribe("fal-ai/flux-lora", {
        input: {
          prompt: input.prompt,
          model_name: null,
          loras: [
            {
              path: "https://storage.googleapis.com/fal-flux-lora/4b7227d661a9477fb3290f270756a361_lora.safetensors",
              scale: 1,
            },
          ],
          embeddings: [],
        },
      });

      const safeResult = imageSchema.parse(result);

      return safeResult;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
