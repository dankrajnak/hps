"use client";
import { signOut } from "next-auth/react";
import { Button, type ButtonProps } from "~/components/ui/button";

const LogoutButton = (props: Omit<ButtonProps, "onClick" | "children">) => (
  <Button {...props} onClick={() => signOut({ callbackUrl: "/" })}>
    Logout
  </Button>
);

export default LogoutButton;
