import express, { Router } from "express";
import cors from "cors";
import session from "express-session";
import RouterList from "./routers/RouterList"
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

app.use("/oauth", RouterList.oauthRouter);
app.use("/diarys", RouterList.diarysRouter);
app.use("/user", RouterList.userRouter);
app.use("/emphathy", RouterList.emphathyRouter);
app.use("/post", RouterList.postRouter);
app.use("/music", RouterList.musicRouter);

export default app;