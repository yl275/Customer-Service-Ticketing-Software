import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div
        className="mx-auto py-4 flex flex-col justify-center
      items-center gap-4"
      >
        <h2 className="text-2xl">Page Not Found</h2>
        <p>Could not find requested resource</p>
        <Image
          className="m-0 rounded-xl"
          src="/images/not-found.jpg"
          width={300}
          height={300}
          sizes="300px"
          alt="Page Not Found"
          priority={true}
          title="Page Not Found"
        />
        <Link
          href="/tickets"
          className="text-center border-4
          border-amber-50 p-2 rounded-2xl hover:bg-amber-50/20
          transition-transform duration-300 hover:scale-105"
        >
          <h3>Go Home</h3>
        </Link>
      </div>
    </div>
  );
}
