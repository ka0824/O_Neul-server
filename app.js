import express from "express";
import cors from "cors";
import diarysRouter from "./routers/diarysRouter";
import userRouter from "./routers/userRouter";
import emphathyRouter from "./routers/emphathyRouter";
import postRouter from "./routers/postRouter";
import oauthRouter from "./routers/oauthRouter";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"))

app.use("/oauth", oauthRouter);
app.use("/diarys", diarysRouter);
app.use("/user", userRouter);
app.use("/emphathy", emphathyRouter);
app.use("/post", postRouter);

export default app;