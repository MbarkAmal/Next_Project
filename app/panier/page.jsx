import CartClient from "@/components/CartClient";

export const metadata = {
  title: "Votre Panier | Grinato",
  description: "Consultez les articles dans votre panier d'achat Grinato.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartClient />;
}
