import Loading from "@/app/loading";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return <Loading />;
  redirect("/tickets");
  // return <h2>Home Page</h2>
}
