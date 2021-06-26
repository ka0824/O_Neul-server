import "regenerator-runtime";
import app from "./app.js";
import sequelize from "sequelize";


const port = 80;

app.listen(port, () => {
    console.log(`Sever listening on port http://localhost:${port}`);
})
