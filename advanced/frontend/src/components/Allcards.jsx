import React from "react";
import { useState, useEffect } from "react";
// import { CardTemplate } from "./CardTemplate";
import "./CardTemplate.css";

export function Allcards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/cardSite/allCards").then(async (res) => {
      const json = await res.json();
      setCards(json.cards);
    });
  }, []);

  return (
    <>
      <CardTemplate cards={cards}></CardTemplate>
    </>
  );
}

function CardTemplate({ cards }) {
  return (
    <div className="card-container">
      {cards.map((card, i) => (
        <div className="card" key={i}>
          <h2>{card.username}</h2>
          <p>{card.description}</p>
          <h3>Interests</h3>
          {card.interests.map((interest, index) => (
            <p key={index}>{interest}</p>
          ))}
          <button onClick={() => window.open(card.LinkedInURL, "_blank")}>
            LinkedIn
          </button>
          <button onClick={() => window.open(card.TwitterURL, "_blank")}>
            Twitter
          </button>
        </div>
      ))}
    </div>
  );
}
