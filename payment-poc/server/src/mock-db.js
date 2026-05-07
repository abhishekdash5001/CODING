const products = [
  {
    id: "prod_1",
    name: "Frontend Interview Course",
    price: 999,
  },
  {
    id: "prod_2",
    name: "Payment Gateway Notes",
    price: 499,
  },
  {
    id: "prod_3",
    name: "System Design Notes",
    price: 799,
  },
];

const carts = [];

const orders = [];

function findProductById(productId) {
  return products.find((product) => product.id === productId);
}

function createCart(userId) {
  const cart = {
    userId,
    id: `cart_${Date.now()}`,
    status: "active",
    items: [],
    createdAt: new Date().toISOString(),
  };


  carts.push(cart)
  return cart;
}


function findActiveCartByUserId(userId) {
    return carts.find((cart) => cart.userId === userId && cart.status === "active");
  }

  function addItemToCart({ userId, quantity, productId }) {
    const product = findProductById(productId);
  
    if (!product) {
      throw new Error("Product not found");
    }
  
    const numericQuantity = Number(quantity);
  
    if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
      throw new Error("Invalid quantity");
    }
  
    let cart = findActiveCartByUserId(userId);
  
    if (!cart) {
      cart = createCart(userId);
    }
  
    const existingItem = cart.items.find((item) => item.productId === productId);
  
    if (existingItem) {
      existingItem.quantity += numericQuantity;
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: numericQuantity, // fixed
      });
    }
  
    return cart;
  }

function findCartById(cartId) {

  return carts.find((cart) => cart.id === cartId);
}

function calculateCartAmountInPaise(cart) {
  const amountInRupees = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return amountInRupees * 100;
}

function createPendingOrder({
  cartId,
  userId,
  amount,
  currency,
  gatewayOrderId,
}) {
  const order = {
    id: `order_${Date.now()}`,
    cartId,
    userId,
    amount,
    currency,
    status: "pending",
    gatewayOrderId,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return order;
}

module.exports = {
    products,
    carts,
    orders,
    findProductById,
    addItemToCart,
    findCartById,
    calculateCartAmountInPaise,
    createPendingOrder,
};
