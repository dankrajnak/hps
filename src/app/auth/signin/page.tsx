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
import { signIn } from "next-auth/react";

import { Input } from "~/components/ui/input";
import { ColorOverlay } from "~/components/colorOverlay";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [isHailey, setIsHailey] = useState(true);
  return (
    <>
      <main className="container mx-auto flex h-screen items-center justify-center p-8 h-screen-ios">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, ease: "easeIn" },
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{isHailey ? "Hailey's" : "Dan's"} sign in.</CardTitle>
              <CardDescription>
                Enter a password so only you can access the site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  let password;
                  // dumb way of getting the password from the form.
                  if (
                    "password" in e.target &&
                    e.target.password != null &&
                    typeof e.target.password === "object" &&
                    "value" in e.target.password
                  ) {
                    password = e.target.password.value;
                  }

                  if (!password) {
                    throw new Error("Password must be provided.");
                  }

                  const resp = await signIn("credentials", {
                    redirect: false,
                    isDan: !isHailey,
                    password,
                  });
                  if (resp?.ok) {
                    let callback = null;
                    if (resp?.url) {
                      const url = new URL(resp.url);
                      callback = url.searchParams.get("callbackUrl");
                      // if the callback is to the root page, don't use it.
                      if (
                        callback != null &&
                        new URL(callback).pathname === "/"
                      ) {
                        callback = null;
                      }
                    }
                    router.push(callback ?? "/p/home");
                  }
                }}
              >
                <div className="flex">
                  <Input
                    name="password"
                    className="flex-grow rounded-r-none"
                    placeholder="password"
                    type="password"
                    autoComplete="new-password"
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

      <button
        className="fixed bottom-0 right-0 m-0 h-8 w-8 cursor-default opacity-0"
        aria-hidden="true"
        onClick={() => setIsHailey((h) => !h)}
      />

      <ColorOverlay animateOnMount={false} />
    </>
  );
}
