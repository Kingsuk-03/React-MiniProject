import React from "react";
import { useState } from "react";
import { CardTemplate } from "./CardTemplate";

export function User() {
  // showcard for display the card box
  // showAddCard input boxes to add card
  //myCard to recieve the use data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [myCard, setMyCard] = useState({});
  const [addcard, setAddCard] = useState({});
  return (
    <React.Fragment>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <input
            type="text"
            placeholder="User Name"
            style={styles.input}
            onChange={function (e) {
              setUsername(e.target.value);
              setShowCard(false);
            }}
          />
          <input
            type="text"
            placeholder="Password"
            style={styles.input}
            onChange={function (e) {
              setPassword(e.target.value);
              setShowCard(false);
            }}
          />
          <div style={styles.buttonContainer}>
            <button
              style={styles.button}
              onClick={() => {
                fetch("http://localhost:3000/user/signup", {
                  method: "POST",
                  body: JSON.stringify({
                    username,
                    password,
                  }),
                  headers: {
                    "Content-type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    alert("SignUp Successfully");
                  })
                  .catch((err) => {
                    console.error(err);
                    alert("SignUp Failed");
                  });
              }}
            >
              SignUp
            </button>
            <button
              style={styles.button}
              onClick={async () => {
                try {
                  const res = await fetch("http://localhost:3000/user/signin", {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                    headers: { "Content-type": "application/json" },
                  });

                  const data = await res.json();

                  if (res.ok) {
                    alert("SignIn Successfully");
                    localStorage.setItem("token", data.token);
                  } else {
                    alert(data.msg || "SignIn Failed");
                  }
                } catch (err) {
                  console.error(err);
                  alert("SignIn Failed");
                }

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
                  if (res.ok && data.card) {
                    console.log(data.card);
                    setMyCard(data.card);
                    // alert("Data Fetched Successfully");
                    console.log("Data Fetched Successfully");
                    setShowCard(true);
                  } else {
                    setShowCard(false);
                    setShowAddCard(true);
                  }
                } catch (err) {
                  console.error(err);
                  alert("Failed to fetch Card");
                }
              }}
            >
              SignIn
            </button>
          </div>
          <div style={styles.buttonContainer}>
            <button
              onClick={async () => {
                if (showCard == true) {
                }
                try {
                  const res = await fetch("http://localhost:3000/user/manage", {
                    method: "DELETE",
                    body: JSON.stringify({ username }),
                    headers: {
                      "Content-type": "application/json",
                      Authorization: localStorage.getItem("token"),
                    },
                  });
                  const data = await res.json();
                  if (res.ok) {
                    if (data.card) {
                      // alert("Data Fetched Successfully");
                      console.log("Card Deleted!");
                      setMyCard(data.card);
                      console.log(data.card);
                      setShowCard(false);
                      setShowAddCard(true);
                    } else {
                      alert("Card Already Deleted! Add a new One!!!");
                      setShowCard(false);
                      setShowAddCard(true);
                    }
                  } else {
                    alert(data.msg || "Something Went Wrong");
                  }
                } catch (err) {
                  console.log("Error:", err);
                }
              }}
            >
              Delete Card
            </button>
          </div>
        </div>
      </div>
      {showCard && myCard && <MyCardView card={myCard} />}
      {showAddCard && <AddCard setAddCard={setAddCard} />}
      {/* {addcard && <CardTemplate card={addcard}></CardTemplate>} */}
      <CardTemplate card={addcard}></CardTemplate>
    </React.Fragment>
  );
}
const MyCardView = React.memo(function MyCardView({ card }) {
  return (
    <div style={styles.cardContainer}>
      <h2>{card.username}</h2>
      <p>{card.description}</p>
      <h3>Interests</h3>
      {card.interests?.map((interest, index) => (
        <p key={index}>{interest}</p>
      ))}
      <button onClick={() => window.open(card.LinkedInURL, "_blank")}>
        LinkedIn
      </button>
      <button onClick={() => window.open(card.TwitterURL, "_blank")}>
        Twitter
      </button>
    </div>
  );
});

const AddCard = React.memo(function AddCard({ setAddCard }) {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState([]);
  const [linkedInURL, setLinkedInURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          onChange={(e) => {
            // const arr = e.target.value.split("@");
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="About You"
          style={styles.input}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Interests"
          style={styles.input}
          onChange={(e) => {
            setInterests(e.target.value.split(/[, ]+/));
          }}
        />
        <input
          type="text"
          placeholder="LinkedIn URL"
          style={styles.input}
          onChange={(e) => {
            setLinkedInURL(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Twitter URL"
          style={styles.input}
          onChange={(e) => {
            setTwitterURL(e.target.value);
          }}
        />
        <button
          style={styles.button}
          onClick={async () => {
            try {
              const res = await fetch(`http://localhost:3000/user/addCard`, {
                method: "POST",
                body: JSON.stringify({
                  username,
                  description: about,
                  interests,
                  LinkedInURL: linkedInURL,
                  TwitterURL: twitterURL,
                }),
                headers: {
                  "Content-type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
              });
            } catch (err) {
              console.log(err);
            }

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
              if (res.ok && data.card) {
                console.log(data.card);
                setAddCard(data.card);
                console.log("Data Fetched Successfully");
              } else {
                console.log("Sorry");
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Add Card
        </button>
      </div>
    </div>
  );
});
const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px 30px",
    margin: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "242px",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "20px 30px",
    margin: "10px",
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    width: "242px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px", // Space between buttons
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4caf50", // Green button
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    width: "100px", // Optional: set a fixed width for buttons to make them equal
  },
};
