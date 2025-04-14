const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;

    try {
        const decodedValue = jwt.verify(token, JWT_SECRET);
        if (decodedValue.username) {
            req.username = decodedValue.username;
            next();
        } else {
            res.status(403).json({ msg: "Failed! You are not authenticated" })

        }

    } catch (e) {
        res.status(400).json({ msg: "Invalid token" });
    }
}

module.exports = userMiddleware;


//NO USE --------------- FROM User.jsx
{/* <button
              style={styles.button}
              onClick={async () => {
                try {
                  const res = await fetch(
                    `http://localhost:3000/user/showCard/${username}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-type": "application/json",
                        Authorization: localStorage.getItem("token"),
                      },
                    }
                  );
                  const data = await res.json();
                  if (res.ok) {
                    console.log(data.card);
                    setMyCard(data.card);
                    // alert("Data Fetched Successfully");
                    console.log("Data Fetched Successfully");
                    setShowCard(true);
                  } else {
                    alert(data.msg || "Something Went Wrong");
                  }
                } catch (err) {
                  console.error(err);
                  alert("Failed to fetch Card");
                }
              }}
            >
              My Card
            </button> */}