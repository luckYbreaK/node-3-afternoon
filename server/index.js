require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const checkForSession = require("./middlewares/checkForSession");
const swagCtrl = require("./controllers/swag_controller");
const authCtrl = require("./controllers/auth_controller");
const cartCtrl = require("./controllers/cart_controller");
const searchCtrl = require("./controllers/search_controller");

const app = express();

const { SERVER_PORT, SESSION_SECRET } = process.env

//MIDDLEWARE
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));


//ENDPOINTS
app.get("/api/swag", swagCtrl.read);
app.post("/api/login", authCtrl.login);
app.post("/api/register", authCtrl.register);
app.post("/api/signout", authCtrl.signout);
app.get("/api/user", authCtrl.getUser);
app.post("/api/cart", cartCtrl.add);
app.post("/api/cart/checkout", cartCtrl.checkout);
app.delete("/api/cart", cartCtrl.remove);
app.get("/api/search", searchCtrl.search);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`);
})