const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const fs = require("fs");
const http = require("http");
const Investors = require("./db/Investors");
const pitch_ideas = require("./db/pitch_ideas"); 

require("dotenv").config();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = process.env.PORT || 4444;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setting up middlewares
app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());
 
// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.get("/investors", (req, res) => {
  console.log("investors");
  Investors.find({}, (err, investors) => {
    if (err) {
      console.log(err);
    } else {
      res.json(investors);
    }
  });
});

app.post("/pitchIdea", (req, res) => {
  console.log("pitchIdea");
  const { name, desc, target, email, amount } = req.body;
  console.log(req.body);
  const newIdea = new pitch_ideas({ name, desc, target, email, amount });
  newIdea.save((err, idea) => {
    if (err) {
      console.log(err);
    } else {
      res.json(idea);
    }
  });
});

const ContentBasedRecommender = require("content-based-recommender-ts");
const recommender = new ContentBasedRecommender({
  minScore: 0.1,
  maxSimilarDocs: 100,
});

app.get("/pitchIdea", (req, res) => {
  console.log("pitchIdea");
  pitch_ideas.find({}, (err, ideas) => {
    if (err) {
      console.log(err);
    } else {
      res.json(ideas);
      const documents = ideas.map((idea) => {
        return { id: idea.email, content: idea.desc };
      });
      // console.log(documents);
      // start training
      recommender.train(documents);

      //get top 10 similar items to document 1000002
      const similarDocuments = recommender.getSimilarDocuments(
        "mahajananvita3@gmail.com",
        0,
        3
      );
      // console.log(similarDocuments);
    }
  });
});



app.get("/recommendPitches", (req, res) => {
  console.log("pitchIdea");
  pitch_ideas.find({}, (err, ideas) => {
    if (err) {
      console.log(err);
    }
    else
    {
      pitch_ideas.find({}, (err, ideas) => {
        if (err) {
          console.log(err);
        } else {
          // res.json(ideas);
          const documents = ideas.map((idea) => {
            return { id: ideas.email, content: ideas.desc };
          });
          // console.log("Documents ",documents);
          // start training 
          recommender.train(documents);
    
          //get top 10 similar items to document 1000002
          // console.log(ideas.desc);
          const similarDocuments = recommender.getSimilarDocuments(
            ideas.desc,
            0,
            10 
          );
          // console.log(similarDocuments);
          res.json(ideas);
        }
      });
    }
  });
});



const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => { 
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});



server.listen(3001, () => {
  console.log(3001, "Chat server!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});  

