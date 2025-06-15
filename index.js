import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import connectDb from "./config/db.js";
import User from "./models/user.js";
import Product from "./models/product.js";
import auth from "./middlewares/auth.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import service from "./models/service.js";

// Initialize
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/bookings", bookingRoutes);

// Frontend routes

app.use(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.locals.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    res.locals.user = user || null;
    next();
  } catch (error) {
    console.error("JWT middleware error:", error);
    res.locals.user = null;
    return next();
  }
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about-us", (req, res) => {
  res.render("about-us");
});
app.get("/contact-us", (req, res) => {
  res.render("contact-us");
});
app.get("/products", async (req, res) => {
  try {
    const limit = 9;
    const page = Math.max(1, parseInt(req.query.page) || 1);

    // Get total count first to calculate pages
    const total = await Product.countDocuments();
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.render("products", {
      products,
      currentPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.render("products", {
      products: [],
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    });
  }
});

app.get("/products/:id", (req, res) => {
  res.render("product-detail");
});
app.get("/services", async (req, res) => {
  res.render("services", { services: await service.find() });
});
app.get("/customer", (req, res) => {
  res.redirect("/");
});
app.get("/profile", async (req, res) => {
  if (!res.locals.user) return res.redirect("/api/users/login");
  try {
    const [orders, bookings] = await Promise.all([
      (await import("./models/order.js")).default
        .find({ customer: res.locals.user._id })
        .populate("products.product"),
      (await import("./models/booking.js")).default
        .find({ customer: res.locals.user._id })
        .populate("service"),
    ]);
    res.render("profile", { orders, bookings });
  } catch (err) {
    console.error("Error fetching profile data:", err);
    res.render("profile", { orders: [], bookings: [] });
  }
});
app.get("/checkout", (req, res) => {
  res.render("checkout");
});
app.get("/admin", auth(["admin"]), (req, res) => {
  res.render("admin");
});

// Global error fallback
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  connectDb();
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
