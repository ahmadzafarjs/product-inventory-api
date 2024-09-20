import app from "./app.js";
import dbConnection from "./db/index.js";

dbConnection().then(() => {
    app.listen(3000, () => {
        console.log("Server starts successfully...")
    })
})