import express from "express";
import App from "./services/ExpressApp";
import dbConnection from "./services/Database";


const startServer =async () => {
    const app = express();

    await dbConnection();

    await App(app);

    app.listen(3500, () => {
        console.log("Server is running on port 3500");
    })
}

startServer();