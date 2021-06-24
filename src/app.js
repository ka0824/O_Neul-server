import express from "express";
import cors from "cors";
import diarysRouter from "./routers/diarysRouter";
import userRouter from "./routers/userRouter";
import emphathyRouter from "./routers/emphathyRouter";
import postRouter from "./routers/postRouter";

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => res.send("Hello World!"))

app.use("/api/diarys", diarysRouter);
app.use("/api/user", userRouter);
app.use("/api/emphathy", emphathyRouter);
app.use("/api/post", postRouter);

export default app;