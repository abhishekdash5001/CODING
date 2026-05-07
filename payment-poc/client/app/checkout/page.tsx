"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type CreateOrderResponse = {
  orderId: string;
  gatewayOrderId: string;
  amount: number;
  currency: "INR";
  status: string;
  razorpayKeyId: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const [cartId, setCartId] = useState<string | null>(null);
  const [order, setOrder] = useState<CreateOrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    setCartId(storedCartId);
  }, []);

  async function createPaymentOrder() {
    if (!cartId) {
      setError("No cart found. Please add products first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      // 1. Load Razorpay checkout script
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // 2. Ask Node backend to create Razorpay order
      const res = await fetch(`${API_URL}/api/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
        }),
      });

      const data: CreateOrderResponse & { message?: string } = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to create payment order");
      }

      setOrder(data);

      // 3. Prepare Razorpay popup options
      const options = {
        key: data.razorpayKeyId,
        amount: data.amount,
        currency: data.currency,
        name: "Payment POC Store",
        description: "Test payment for interview POC",
        order_id: data.gatewayOrderId,

        handler: function (response: any) {
          console.log("Razorpay success callback:", response);

          alert(
            `Payment callback received.\nPayment ID: ${response.razorpay_payment_id}`
          );

          /**
           * Important:
           * Do not mark order paid here.
           * Next step: send this response to Node verify API.
           */
        },

        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#111827",
        },

        modal: {
          ondismiss: function () {
            console.log("Razorpay popup closed by user");
            setError("Payment popup was closed. You can try again.");
          },
        },
      };

      // 4. Open Razorpay popup
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Checkout</h1>

      <p>
        <strong>Cart ID:</strong> {cartId || "No cart found"}
      </p>

      <button onClick={createPaymentOrder} disabled={loading || !cartId}>
        {loading ? "Starting payment..." : "Pay Now"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {order && (
        <section
          style={{
            marginTop: 24,
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 16,
          }}
        >
          <h2>Payment Order Created</h2>

          <p>
            <strong>Internal Order ID:</strong> {order.orderId}
          </p>

          <p>
            <strong>Razorpay Order ID:</strong> {order.gatewayOrderId}
          </p>

          <p>
            <strong>Amount:</strong> ₹{order.amount / 100}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </section>
      )}
    </main>
  );
}