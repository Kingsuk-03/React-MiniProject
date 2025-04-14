const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
app.use(cors());
const adminRouter = require("./routes/adminRoute")
const userRouter = require("./routes/userRoute")
const cardSiteRouter = require("./routes/cardSiteRoute")

app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/cardSite", cardSiteRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})