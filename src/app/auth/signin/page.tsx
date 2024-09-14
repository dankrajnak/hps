"use client";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { signIn, getProviders, getCsrfToken } from "next-auth/react";

import { Input } from "~/components/ui/input";
import { ColorOverlay } from "~/components/colorOverlay";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  return (
    <>
      <main className="mx-auto flex h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, ease: "easeIn" },
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Hey Hailey.</CardTitle>
              <CardDescription>
                Enter a password so only you can access this.{" "}
                <i>Please use a password generator</i>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const resp = await signIn("credentials", {
                    redirect: false,
                    isDan: false,
                    password: "test",
                  });
                  if (resp?.ok) {
                    let callback = null;
                    if (resp?.url) {
                      const url = new URL(resp.url);
                      console.log(url, url.searchParams);
                      callback = url.searchParams.get("callbackUrl");
                    }
                    router.push(callback ?? "/p/home");
                  }
                }}
              >
                <div className="flex">
                  <Input
                    className="flex-grow rounded-r-none"
                    placeholder="password"
                    type="password"
                  />
                  <Button type="submit" className="rounded-l-none">
                    sign in
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <ColorOverlay animateOnMount={false} />
    </>
  );
}
