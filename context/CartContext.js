"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// À ADAPTER : renvoie l'_id de l'utilisateur connecté, ou null s'il n'y en a pas
const getUserId = () => {
  try {
    return JSON.parse(localStorage.getItem("user"))?._id || null;
  } catch {
    return null;
  }
};

// Transforme le panier de la base au format utilisé par le site
const fromServer = (serverCart) =>
  (serverCart?.items || [])
    .filter((it) => it.product)
    .map((it) => ({
      ...it.product,
      quantity: it.quantity,
      size: it.size,
      color: it.color,
      itemId: it._id, // identifiant de la ligne dans la base
    }));

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Recharge le panier depuis la base
  const refresh = async (userId) => {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      const data = await res.json();
      if (data.success) setCart(fromServer(data.cart));
      else console.error("Cart GET:", data.error);
    } catch (e) {
      console.error("Cart GET failed:", e);
    }
  };

  // Au démarrage : base si connecté, sinon localStorage
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      refresh(userId);
    } else {
      const saved = localStorage.getItem("cart");
      if (saved) setCart(JSON.parse(saved));
    }
  }, []);

  // Copie locale (utile pour les visiteurs non connectés)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Envoie une requête à l'API puis recharge le panier
  const callApi = async (method, url, body) => {
    const userId = getUserId();
    if (!userId) return false;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify({ userId, ...body }) : undefined,
      });
      const data = await res.json();
      if (!data.success) console.error(`Cart ${method}:`, data.error);
      await refresh(userId);
      return data.success;
    } catch (e) {
      console.error(`Cart ${method} failed:`, e);
      return false;
    }
  };

  const addToCart = async (product, options = {}) => {
    const { color, size } = options; // color = { name, image }, size = "M"
    if (getUserId()) {
      await callApi("POST", "/api/cart", {
        productId: product._id,
        color,
        size,
        quantity: 1,
      });
      return;
    }
    // Visiteur non connecté : localStorage seulement
    setCart((prev) => {
      const exist = prev.find((i) => i._id === product._id);
      return exist
        ? prev.map((i) =>
            i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...product, quantity: 1, color, size }];
    });
  };

  const removeFromCart = async (_id) => {
    const item = cart.find((i) => i._id === _id);
    if (getUserId() && item?.itemId) {
      await callApi("DELETE", `/api/cart?userId=${getUserId()}&itemId=${item.itemId}`);
      return;
    }
    setCart((prev) => prev.filter((i) => i._id !== _id));
  };

  const clearCart = async () => {
    if (getUserId()) {
      await callApi("DELETE", `/api/cart?userId=${getUserId()}`);
      return;
    }
    setCart([]);
  };

  const changeQuantity = async (_id, delta) => {
    const item = cart.find((i) => i._id === _id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    if (getUserId() && item.itemId) {
      await callApi("PUT", "/api/cart", { itemId: item.itemId, quantity: newQty });
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i._id === _id ? { ...i, quantity: newQty } : i))
    );
  };

  const increaseQuantity = (_id) => changeQuantity(_id, 1);
  const decreaseQuantity = (_id) => changeQuantity(_id, -1);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);