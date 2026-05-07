"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
};

type CartResponse = {
  cartId: string;
  status: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  amount: number;
  amountInRupees: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function fetchProducts() {
    try {
      const res = await fetch(`${API_URL}/api/products`);

      if (!res.ok) {
        throw new Error("Unable to fetch products");
      }

      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  async function addToCart(productId: string) {
    try {
      setLoadingProductId(productId);
      setError("");

      const res = await fetch(`${API_URL}/api/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to add item to cart");
      }

      setCart(data);

      /**
       * For POC:
       * Store cartId so checkout page can use it.
       *
       * In real app:
       * Cart is usually fetched from backend using auth session.
       */
      localStorage.setItem("cartId", data.cartId);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoadingProductId(null);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Products</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <section style={{ display: "grid", gap: 16 }}>
        {products.map((product) => {
          const isLoading = loadingProductId === product.id;

          return (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: 16,
                borderRadius: 8,
              }}
            >
              <h2>{product.name}</h2>
              <p>₹{product.price}</p>

              <button onClick={() => addToCart(product.id)} disabled={isLoading}>
                {isLoading ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </section>

      {cart && (
        <section
          style={{
            marginTop: 32,
            border: "1px solid #ccc",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <h2>Cart</h2>

          <p>
            <strong>Cart ID:</strong> {cart.cartId}
          </p>

          {cart.items.map((item) => (
            <p key={item.productId}>
              {item.name} × {item.quantity} = ₹{item.price * item.quantity}
            </p>
          ))}

          <h3>Total: ₹{cart.amountInRupees}</h3>

          <a href="/checkout">Go to Checkout</a>
        </section>
      )}
    </main>
  );
}