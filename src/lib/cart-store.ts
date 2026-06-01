import { useEffect, useState, useCallback } from "react";
import type { Product } from "./menu-data";

export type CartItem = { product: Product; qty: number };
export type Customer = { name: string; phone: string; address: string };

const CART_KEY = "leley.cart.v1";
const CUSTOMER_KEY = "leley.customer.v1";

type Listener = () => void;
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  emit();
}

export function readCustomer(): Customer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CUSTOMER_KEY);
    return raw ? (JSON.parse(raw) as Customer) : null;
  } catch {
    return null;
  }
}
export function writeCustomer(c: Customer) {
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(c));
  emit();
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const sync = () => {
      setItems(readCart());
      setCustomer(readCustomer());
    };
    sync();
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((product: Product) => {
    const cur = readCart();
    const found = cur.find((i) => i.product.id === product.id);
    if (found) found.qty += 1;
    else cur.push({ product, qty: 1 });
    writeCart(cur);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    let cur = readCart();
    if (qty <= 0) cur = cur.filter((i) => i.product.id !== id);
    else cur = cur.map((i) => (i.product.id === id ? { ...i, qty } : i));
    writeCart(cur);
  }, []);

  const clear = useCallback(() => writeCart([]), []);

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, total, count, add, setQty, clear, customer, setCustomer: writeCustomer };
}