const express = require("express"),
    routes = require("./routes"),
    app = express();

// middleware to except JSON in request body
app.use(express.json());

app.use("/api/v1/", routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});