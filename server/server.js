// TODO: Create Sequelize connector from models folder and import in to connect to postgres server.
import express from "express";
const app = express();
const PORT = process.env.PORT || 3001;
// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
