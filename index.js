
const express = require('express');

const bodyParser = require('body-parser');
const config = require('./config/db');
const UserRoutes = require("./routes/user.routes");
const BookRoutes = require("./routes/book.routes");
const OrderRoutes = require("./routes/order.routes")
const authMiddleware = require('./middleware/auth.middleware');

const app = express();

app.use(bodyParser.json());
app.get("", (req,res)=> {
    res.send("welcome to masai library.. :)")
})

app.use('/api', BookRoutes);
app.use('/api', OrderRoutes);
app.use('/api', UserRoutes)

const port = process.env.PORT || 8080;
app.listen(port, async() => {
    await config;
  console.log(`Server is running on port ${port}`);
});
