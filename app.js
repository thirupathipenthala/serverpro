var express = require('express');
const http = require("http");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoutes')
const { MANGO_URL } = require("./config.js");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
/*mongoose
    .connect(MANGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));*/
mongoose.connect(MANGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('connected');
})
mongoose.connection.on('error', (err) => {
    console.log("err connecting", err)
})
const customMiddleware = (req, res, next) => {
    console.log('middleware executed!!')
    next()
}
app.use("/auth", authRoutes);
app.get('/', customMiddleware, function (req, res) {
    res.send('Hello World!');
});
app.set("port", process.env.PORT || 7000);
http.createServer(app).listen(app.get("port"), function () {
    console.log("port" + app.get("port"));
});
