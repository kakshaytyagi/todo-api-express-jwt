import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";

const port = process.env.PORT || 3000;
const secretKey = "my_secret_key";
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory database
let todos = [];

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "REST api using Node.js - by Akshay Tyagi",
  });
});

app.post("/login", (req, res) => {
  // Assuming the request contains username and password for authentication
  const { username, password } = req.body;

  // Authenticate user (dummy example)
  let user;
  if (username === "admin" && password === "password") {
    user = {
      id: 1,
      username: "admin",
      firstname: "Akshay",
      lastname: "Tyagi",
      email: "akshaytyagi3102003@gmail.com",
      isActive: true,
      roles: ["Admin"],
    };
  } else if (username === "user" && password === "password") {
    user = {
      id: 2,
      username: "user",
      firstname: "Example",
      lastname: "Only",
      email: "user@gmail.com",
      isActive: true,
      roles: ["User"],
    };
  }

  if (user) {
    // Generate JWT token
    jwt.sign(user, secretKey, { expiresIn: "1000s" }, (err, token) => {
      if (err) {
        res.status(500).json({ error: "Failed to generate token" });
      } else {
        res.json({ token });
      }
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        req.user = decoded; // Add user data to request object

        // Check user roles for access control
        const { roles } = req.user;
        if (roles.includes("Admin")) {
          // Admin users have access to all endpoints
          next();
        } else if (roles.includes("User")) {
          // User role can access specific endpoints
          if (req.method === "GET" && req.path === "/getall") {
            // User can access the "getall" endpoint
            next();
          } else {
            res.status(401).json({ error: "Unauthorized access" });
          }
        } else {
          res.status(401).json({ error: "Unauthorized access" });
        }
      }
    });
  } else {
    res.status(401).json({ error: "Token is missing" });
  }
}

// TodoController: Get single todo item
app.get("/get/:id", verifyToken, (req, res) => {
  // Retrieve todo item with the specified id
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo item not found" });
  }
});

// TodoController: Get all todo items
app.get("/getall", verifyToken, (req, res) => {
  // Return all todo items
  res.json(todos);
});

// TodoController: Update single todo item
app.put("/put/:id", verifyToken, (req, res) => {
  // Update todo item with the specified id
  const id = req.params.id;
  const updatedTodo = req.body;
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos[index] = updatedTodo;
    res.json({ message: "Todo item updated successfully" });
  } else {
    res.status(404).json({ error: "Todo item not found" });
  }
});

// TodoController: Create new todo item
app.post("/create/:id", verifyToken, (req, res) => {
  // Create a new todo item
  const id = req.params.id;
  const newTodo = req.body;
  newTodo.id = id;
  todos.push(newTodo);
  res.json({ message: "Todo item created successfully" });
});

// TodoController: Delete todo item
app.delete("/delete/:id", verifyToken, (req, res) => {
  // Delete todo item with the specified id
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: "Todo item deleted successfully" });
  } else {
    res.status(404).json({ error: "Todo item not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
