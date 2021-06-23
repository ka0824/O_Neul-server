import app from "./app.js";

const port = 80;

app.listen(port, () => {
    console.log(`Sever listening on port http://localhost:${port}`);
})