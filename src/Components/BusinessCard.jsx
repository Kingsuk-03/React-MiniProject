import "./BusinessCard.css";

export function BusinessCard({
  name,
  description,
  interests,
  LinkedInURL,
  TwitterURL,
}) {
  return (
    <div>
      <h2>{name}</h2>
      <p />
      <p>{description}</p>
      <h3>Interests</h3>
      <p />
      {interests.map((i, index) => (
        <p key={index}>{i}</p>
      ))}
      <p />
      <button onClick={() => window.open(LinkedInURL, "_blank")}>
        LinkedIn
      </button>
      <button onClick={() => window.open(TwitterURL, "_blank")}>Twitter</button>
    </div>
  );
}
