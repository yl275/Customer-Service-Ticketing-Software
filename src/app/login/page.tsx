import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="h-dvh flex flex-col items-center gap-6 p-4 text-4xl">
      <h1>Repair Shop</h1>
      <Button asChild>
        <LoginLink>Sign in</LoginLink>
      </Button>
    </main>
  );
}
