export function CardTemplate({ card }) {
  return (
    <div className="card-container">
      <div className="card">
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
    </div>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "20px",
    width: "300px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  button: {
    margin: "8px",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "#fff",
    cursor: "pointer",
  },
};
