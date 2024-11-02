const express = require("express");
const mongoose = require("mongoose");

const MONGODB_URI ="mongodb+srv://latioms:DuM7S82EdSr5xmC4@cluster0.gtxgx4f.mongodb.net/realtime-list?tls=true"
const path = require("path");

const app = express();

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// definition du schema
const userSchema = new mongoose.Schema({
  name: String,
});


const user = mongoose.model("Users", userSchema);

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//routes API
app.get("/api/users", async (req, res) => {
  const users = await user.find();
  res.send(users);
});

app.post("/api/users", async (req, res) => {
    const newUser = new user({
        name: req.body.name,
    });
    await newUser.save();
    res.status(201).json(newUser);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});