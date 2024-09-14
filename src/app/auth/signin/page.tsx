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
                    isDan: false,
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
