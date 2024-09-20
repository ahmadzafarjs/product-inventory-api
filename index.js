import app from "./app.js";
import dbConnection from "./db/index.js";

dbConnection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server starts successfully...")
    })
})