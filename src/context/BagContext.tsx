"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type BagItem = {
  id: string;
  name: string;
  image: string;
  variant: string;
  price: number;
  qty: number;
};

type AddableBagItem = Omit<BagItem, "qty"> & { qty?: number };

type BagContextValue = {
  items: BagItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (item: AddableBagItem) => void;
  removeItem: (id: string) => void;
  openBag: () => void;
  closeBag: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);

const INITIAL_ITEMS: BagItem[] = [
  {
    id: "aero-form-01-41-obsidian",
    name: "Aero Form 01",
    image: "/images/product-aero-form.png",
    variant: "SIZE: 41 · OBSIDIAN",
    price: 420,
    qty: 1,
  },
  {
    id: "vector-shell-02-noir",
    name: "Vector Shell",
    image: "/images/product-vector-shell.png",
    variant: "SIZE: 02 · NOIR",
    price: 680,
    qty: 1,
  },
];

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>(INITIAL_ITEMS);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: AddableBagItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i,
        );
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const openBag = useCallback(() => setIsOpen(true), []);
  const closeBag = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);

  return (
    <BagContext.Provider
      value={{
        items,
        isOpen,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        openBag,
        closeBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used within a BagProvider");
  return ctx;
}
