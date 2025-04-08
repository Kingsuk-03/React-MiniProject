export function BusinessCard({
  name,
  description,
  interests,
  LinkedInURL,
  TwitterURL,
}) {
  return (
    <div>
      <h3>{name}</h3>
      <br />
      <p>{description}</p>
      <h4>Interests</h4>
      <br />
      {interests}
      <br />
      <button onClick={() => window.open({ LinkedInURL }, "_blank")}>
        LinkedIn
      </button>
      <button onClick={() => window.open({ TwitterURL }, "_blank")}>
        Twitter
      </button>
    </div>
  );
}
