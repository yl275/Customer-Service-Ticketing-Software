import { redirect } from "next/navigation";

export const metadata = {
  title: "Home",
};

export default function Home() {
  redirect("/tickets");
  // return <h2>Home Page</h2>
}
