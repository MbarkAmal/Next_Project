export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Log page views
export const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag && GA_TRACKING_ID) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Generic event
export const trackEvent = ({ action, category, label, value, ...rest }) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

// GA4 E-commerce: view_item_list
export const trackViewItemList = (items = [], itemListName = "Product List") => {
  if (typeof window === "undefined" || !window.gtag || !items.length) return;
  window.gtag("event", "view_item_list", {
    item_list_name: itemListName,
    items: items.map((p, idx) => ({
      item_id: p.sku || p._id || p.slug,
      item_name: p.name,
      item_category: p.category,
      price: p.price,
      index: idx + 1,
    })),
  });
};

// GA4 E-commerce: view_item
export const trackViewItem = (product, selectedColor, selectedSize) => {
  if (typeof window === "undefined" || !window.gtag || !product) return;
  const variant = [selectedColor, selectedSize].filter(Boolean).join(" / ");
  window.gtag("event", "view_item", {
    currency: "USD",
    value: product.price,
    items: [
      {
        item_id: product.sku || product._id || product.slug,
        item_name: product.name,
        item_category: product.category,
        item_variant: variant || undefined,
        price: product.price,
        quantity: 1,
      },
    ],
  });
};

// GA4 E-commerce: add_to_cart
export const trackAddToCart = (product, quantity = 1, selectedColor, selectedSize) => {
  if (typeof window === "undefined" || !window.gtag || !product) return;
  const variant = [selectedColor, selectedSize].filter(Boolean).join(" / ");
  window.gtag("event", "add_to_cart", {
    currency: "USD",
    value: Number((product.price * quantity).toFixed(2)),
    items: [
      {
        item_id: product.sku || product._id || product.slug,
        item_name: product.name,
        item_category: product.category,
        item_variant: variant || undefined,
        price: product.price,
        quantity,
      },
    ],
  });
};

// GA4 E-commerce: begin_checkout
export const trackBeginCheckout = (cartItems = [], totalValue = 0) => {
  if (typeof window === "undefined" || !window.gtag || !cartItems.length) return;
  window.gtag("event", "begin_checkout", {
    currency: "USD",
    value: Number(totalValue.toFixed(2)),
    items: cartItems.map((item) => ({
      item_id: item.sku || item._id || item.slug,
      item_name: item.name,
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// GA4 E-commerce: purchase
export const trackPurchase = ({ transactionId, value = 0, items = [], tax = 0, shipping = 0 }) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "purchase", {
    transaction_id: transactionId || `TX-${Date.now()}`,
    currency: "USD",
    value: Number(value.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    items: items.map((item) => ({
      item_id: item.sku || item._id || item.productId || item.slug,
      item_name: item.name || "Product",
      item_category: item.category,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};
