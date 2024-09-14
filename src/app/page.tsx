import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import HomeContent from "~/app/homeContent";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/p/home");
  }
  return <HomeContent />;
}
