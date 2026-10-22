import CheckoutClient from "@/components/CheckoutClient";

export const metadata = {
  title: "Checkout | Grinato",
  description: "Complete your secure order on Grinato.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
