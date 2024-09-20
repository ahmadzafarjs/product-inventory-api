import app from "./app.js";
import dbConnection from "./db/index.js";

const PORT = process.env.PORT || 3000

dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log("Server starts successfully...")
    })
})