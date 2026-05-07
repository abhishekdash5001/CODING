const express = require("express");
const cors = require("cors");
const {
  products,
  findProductById,
  addItemToCart,
  findCartById,
  calculateCartAmountInPaise,
  createPendingOrder,
} = require("./mock-db");
require("dotenv").config();

const razorpay = require("./razorpay.js");
const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Payment POC backend is running");
});

app.post("/api/payments/create-order", async(req, res) => {
  try {
    const { cartId } = req.body;
    console.log(cartId);

    if (!cartId) {
      return res.status(401).json({
        message: "cart id  is required",
      });
    }

    const cart = findCartById(cartId);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    /**
     * In real app:
     * userId should come from auth token/session.
     * For POC we hardcode it.
     */

    const userId = "user_1";

    if (cart.userId !== userId) {
      return res.status(403).json({
        message: "Unauthorized cart access",
      });
    }

    /**
     * Very important:
     * Amount is calculated on backend.
     * Frontend should not decide amount.
     */
    const amount = calculateCartAmountInPaise(cart);

    /**
     * For now this is fake gateway order ID.
     * Later Razorpay will generate this.
     */
    // const gatewayOrderId = `gateway_order_${Date.now()}`;


    const razorpayOrder = await razorpay.orders.create({
        amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          cartId,
          userId,
        },
      });
    const order = createPendingOrder({
      cartId,
      userId,
      amount,
      currency: "INR",
      gatewayOrderId:razorpayOrder.id
    });

    return res.status(201).json({
      orderId: order.id,
      gatewayOrderId: order.gatewayOrderId,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Unable to create payment order",
    });
  }
});

app.get("/api/products", (req, res) => {
  return res.json({ products });
});

app.post("/api/cart/items", (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!findProductById(productId)) {
      return res.json({ message: "not valid prodcut" }).status(403);
    }

    const userId = "user_1";

    const cart = addItemToCart({ userId, productId, quantity });

    const amount = calculateCartAmountInPaise(cart);

    return res.status(201).json({
      cartId: cart.id,
      status: cart.status,
      items: cart.items,
      amount,
      amountInRupees: amount / 100,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    console.error("Add to cart error:", error);

    return res.status(500).json({
      message: "Unable to add item to cart",
    });
  }
});
app.listen(PORT, () => {
  console.log("server running in 4000");
});
