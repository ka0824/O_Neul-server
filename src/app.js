import express from "express";
import cors from "cors";
import session from "express-session";
import diarysRouter from "./routers/diarysRouter";
import userRouter from "./routers/userRouter";
import emphathyRouter from "./routers/emphathyRouter";
import postRouter from "./routers/postRouter";
import oauthRouter from "./routers/oauthRouter";
import "dotenv/config"

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://oneul.site"],
    credentials: true,
    method: ["GET", "POST", "DELETE", "PATCH"]
  })
)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: ["localhost", "oneul.site"],
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"))

app.use("/oauth", oauthRouter);
app.use("/diarys", diarysRouter);
app.use("/user", userRouter);
app.use("/emphathy", emphathyRouter);
app.use("/post", postRouter);

export default app;