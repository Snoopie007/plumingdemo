"use client";

import { useCallback, useEffect, useState } from "react";

export type CartItem = {
    variantId: string;
    productId: string;
    name: string;
    color: string | null;
    size: string | null;
    sku: string;
    imageUrl: string | null;
    priceCents: number;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

const STORAGE_KEY = "shop_cart";
const EMPTY: CartState = { items: [] };

function readStorage(): CartState {
    if (typeof window === "undefined") return EMPTY;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as CartState) : EMPTY;
    } catch {
        return EMPTY;
    }
}

function writeStorage(state: CartState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useShopCart() {
    const [cart, setCart] = useState<CartState>(EMPTY);

    // Hydrate from localStorage on mount
    useEffect(() => {
        setCart(readStorage());
    }, []);

    const persist = useCallback((next: CartState) => {
        setCart(next);
        writeStorage(next);
    }, []);

    /** Add one unit of a variant (or increase qty if already in cart) */
    const addItem = useCallback(
        (item: Omit<CartItem, "quantity">, qty = 1) => {
            setCart((prev) => {
                const existing = prev.items.find((i) => i.variantId === item.variantId);
                const next: CartState = existing
                    ? {
                          items: prev.items.map((i) =>
                              i.variantId === item.variantId
                                  ? { ...i, quantity: i.quantity + qty }
                                  : i
                          ),
                      }
                    : { items: [...prev.items, { ...item, quantity: qty }] };
                writeStorage(next);
                return next;
            });
        },
        []
    );

    /** Set an exact quantity; removes the item if qty <= 0 */
    const setQuantity = useCallback((variantId: string, qty: number) => {
        setCart((prev) => {
            const next: CartState =
                qty <= 0
                    ? { items: prev.items.filter((i) => i.variantId !== variantId) }
                    : {
                          items: prev.items.map((i) =>
                              i.variantId === variantId ? { ...i, quantity: qty } : i
                          ),
                      };
            writeStorage(next);
            return next;
        });
    }, []);

    /** Remove a variant entirely */
    const removeItem = useCallback((variantId: string) => {
        setCart((prev) => {
            const next: CartState = {
                items: prev.items.filter((i) => i.variantId !== variantId),
            };
            writeStorage(next);
            return next;
        });
    }, []);

    /** Empty the cart */
    const clearCart = useCallback(() => {
        persist(EMPTY);
    }, [persist]);

    // Derived values
    const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotalCents = cart.items.reduce(
        (sum, i) => sum + i.priceCents * i.quantity,
        0
    );

    return {
        items: cart.items,
        itemCount,
        subtotalCents,
        addItem,
        setQuantity,
        removeItem,
        clearCart,
    };
}
