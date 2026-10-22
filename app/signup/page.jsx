import SignUpClient from "@/components/SignUpClient";

export const metadata = {
  title: "Create Account | Grinato",
  description: "Create an account on Grinato to start shopping.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return <SignUpClient />;
}
