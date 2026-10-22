import SignInClient from "@/components/SignInClient";

export const metadata = {
  title: "Sign In | Grinato",
  description: "Sign in to your Grinato customer account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return <SignInClient />;
}
