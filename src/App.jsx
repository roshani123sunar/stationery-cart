
import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Notebook", price: 3000, image: "https://i.pinimg.com/1200x/28/94/28/28942838499930abe1669989df114c55.jpg" },
  { id: 2, name: "Gel Pen Set", price: 4500, image: "https://i.pinimg.com/1200x/66/e6/9b/66e69b444ea39a2fe601b79d5e9ca084.jpg" },
  { id: 3, name: "Highlighter Set", price: 5000, image: "https://i.pinimg.com/736x/1f/d2/6c/1fd26c859f91bf87cb6ae4930172509c.jpg" },
  { id: 4, name: "Sticky Notes", price: 2500, image: "https://i.pinimg.com/736x/6e/c7/1b/6ec71b543f7fa90c408aecb5889a42e9.jpg" },
  { id: 5, name: "Pencil Case", price: 8000, image: "https://i.pinimg.com/1200x/30/24/f0/3024f09eebec0a06865ad6ad6499f101.jpg" },
  { id: 6, name: "Pastel Marker Set", price: 6500, image: "https://i.pinimg.com/1200x/ca/f2/16/caf216bdbce667033ce51f6f67546603.jpg" }
];

function App() {
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function addToCart(product) {
    setOrderPlaced(false);
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function increaseQuantity(id) {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  }

  function decreaseQuantity(id) {
    setCart(cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  function placeOrder() {
    setCart([]);
    setCheckoutOpen(false);
    setOrderPlaced(true);
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Little Paper Shop</h1>
        <p style={styles.subtitle}>
          Everything you need for your study days!
        </p>
        <div style={styles.cartBadge}>
          🛒 My Cart: {totalItems} items
        </div>
      </header>

      <main style={styles.container}>
        <section style={styles.productsSection}>
          <h2 style={styles.heading}>Our Stationery Collection</h2>
          <p style={styles.description}>
            Find your favorite stationery products.
          </p>

          <div style={styles.productGrid}>
            {products.map(product => (
              <div style={styles.productCard} key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.productImage}
                />

                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.price}>
                    ₩{product.price.toLocaleString("en-KR")}
                  </p>

                  <button
                    style={styles.addButton}
                    onClick={() => addToCart(product)}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.cartSection}>
          <h2 style={styles.heading}>Shopping Cart 🛍️</h2>

          {orderPlaced && (
            <div style={styles.successMessage}>
              🎉 Your order has been placed successfully!
              <p>Thank you for shopping with Little Paper Shop.</p>
            </div>
          )}

          {cart.length === 0 ? (
            <p style={styles.emptyCart}>
              Your cart is empty. Start shopping!
            </p>
          ) : (
            <div>
              {cart.map(item => (
                <div style={styles.cartItem} key={item.id}>
                  <div style={styles.cartDetails}>
                    <h3 style={styles.cartName}>{item.name}</h3>
                    <p style={styles.cartPrice}>
                      ₩{item.price.toLocaleString("en-KR")}
                    </p>

                    <div style={styles.quantityControls}>
                      <button
                        style={styles.quantityButton}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>

                      <span style={styles.quantity}>{item.quantity}</span>

                      <button
                        style={styles.quantityButton}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    style={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <div style={styles.totalBox}>
            <p>Total Items: {totalItems}</p>
            <h2 style={styles.totalPrice}>
              Total: ₩{totalPrice.toLocaleString("en-KR")}
            </h2>

            {cart.length > 0 && (
              <button
                style={styles.checkoutButton}
                onClick={() => setCheckoutOpen(true)}
              >
                Proceed to Checkout →
              </button>
            )}
          </div>

          {checkoutOpen && cart.length > 0 && (
            <div style={styles.checkoutBox}>
              <h2 style={styles.heading}>Order Summary 🧾</h2>
              <p>Please review your order before placing it.</p>

              {cart.map(item => (
                <div style={styles.summaryItem} key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <strong>
                    ₩{(item.price * item.quantity).toLocaleString("en-KR")}
                  </strong>
                </div>
              ))}

              <div style={styles.summaryTotal}>
                Total Amount: ₩{totalPrice.toLocaleString("en-KR")}
              </div>

              <button
                style={styles.placeOrderButton}
                onClick={placeOrder}
              >
                Place Order
              </button>

              <button
                style={styles.cancelButton}
                onClick={() => setCheckoutOpen(false)}
              >
                Back to Cart
              </button>
            </div>
          )}
        </section>
      </main>

      <footer style={styles.footer}>
        <p>Little Paper Shop | Made with React</p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#eef6ff",
    color: "#26354a",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    backgroundColor: "#d8eaff",
    textAlign: "center",
    padding: "35px 20px"
  },
  title: {
    color: "#234a70",
    fontSize: "34px",
    margin: "0 0 10px"
  },
  subtitle: { color: "#526b86" },
  cartBadge: {
    display: "inline-block",
    backgroundColor: "#ffffff",
    color: "#234a70",
    padding: "10px 18px",
    borderRadius: "20px",
    marginTop: "10px",
    fontWeight: "bold"
  },
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "25px 20px"
  },
  productsSection: { marginBottom: "40px" },
  heading: { color: "#234a70", fontSize: "25px" },
  description: { color: "#62758a" },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "22px",
    marginTop: "25px"
  },
  productCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #d5e7fa",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 3px 10px rgba(50, 90, 130, 0.08)"
  },
  productImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    backgroundColor: "#f4f9ff"
  },
  productInfo: { padding: "15px" },
  productName: { color: "#315f8c", margin: "5px 0" },
  price: { fontWeight: "bold", color: "#234a70" },
  addButton: {
    width: "100%",
    padding: "11px",
    backgroundColor: "#d8eaff",
    color: "#234a70",
    border: "1px solid #b8d5f2",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  cartSection: {
    backgroundColor: "#ffffff",
    padding: "22px",
    borderRadius: "12px",
    border: "1px solid #d5e7fa"
  },
  emptyCart: { color: "#8295aa", padding: "20px 0" },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    borderBottom: "1px solid #e5edf6",
    padding: "15px 0"
  },
  cartDetails: { flex: 1 },
  cartName: { color: "#315f8c", margin: "0 0 5px" },
  cartPrice: { margin: "5px 0", color: "#52647a" },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "10px"
  },
  quantityButton: {
    backgroundColor: "#d8eaff",
    color: "#234a70",
    border: "1px solid #b8d5f2",
    borderRadius: "6px",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    fontSize: "18px"
  },
  quantity: { fontWeight: "bold" },
  removeButton: {
    backgroundColor: "#ffffff",
    color: "#a34d5b",
    border: "1px solid #e8c4ca",
    borderRadius: "6px",
    padding: "8px 12px",
    cursor: "pointer"
  },
  totalBox: {
    backgroundColor: "#f4f9ff",
    padding: "18px",
    borderRadius: "8px",
    marginTop: "20px",
    textAlign: "right"
  },
  totalPrice: { color: "#234a70" },
  checkoutButton: {
    backgroundColor: "#477eae",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px"
  },
  checkoutBox: {
    backgroundColor: "#f4f9ff",
    border: "1px solid #d5e7fa",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "20px"
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #dce8f5",
    color: "#526b86"
  },
  summaryTotal: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#234a70",
    margin: "20px 0"
  },
  placeOrderButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#477eae",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  cancelButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ffffff",
    color: "#315f8c",
    border: "1px solid #b8d5f2",
    borderRadius: "7px",
    cursor: "pointer"
  },
  successMessage: {
    backgroundColor: "#e8f6ee",
    color: "#286344",
    padding: "15px",
    borderRadius: "8px",
    margin: "15px 0"
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    color: "#62758a"
  }
};

export default App;
