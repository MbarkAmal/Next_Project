"use client";

import { useEffect } from "react";
import { trackViewItemList } from "@/lib/analytics";

export default function ProductListTracker({ products = [], listName = "Product List" }) {
  useEffect(() => {
    if (products.length > 0) {
      trackViewItemList(products, listName);
    }
  }, [products, listName]);

  return null;
}
