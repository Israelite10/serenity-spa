import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <SignIn appearance={{ variables: { colorPrimary: "#D4AF37", colorBackground: "#141210" } }} />
    </div>
  );
}
