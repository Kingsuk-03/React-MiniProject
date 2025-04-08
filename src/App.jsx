import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BusinessCard } from "./Components/BusinessCard";

function App() {
  const [person, setPerson] = useState([
    {
      name: "Kingsuk",
      description: "Learning React",
      interests: ["MERN", "Open Source", "FullStack Applications"],
      LinkedInURL: "https://www.linkedin.com/in/kingsuk-bose-995615245/",
      TwitterURL: "https://www.instagram.com/kingsuk.bose03",
    },
  ]);

  return (
    <>
      <BusinessCard
        name={person[0].name}
        description={person[0].description}
        interests={person[0].interests}
        LinkedInURL={person[0].LinkedInURL}
        TwitterURL={person[0].TwitterURL}
      ></BusinessCard>
    </>
  );
}

export default App;
