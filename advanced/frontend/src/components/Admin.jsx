export function Admin() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <input type="text" placeholder="Admin Name" style={styles.input} />
        <input type="text" placeholder="Password" style={styles.input} />
        <div style={styles.buttonContainer}>
          <button style={styles.button}>SignUp</button>
          <button style={styles.button}>SignIn</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
    backgroundColor: "#007bff", // Green button
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    width: "100px", // Optional: set a fixed width for buttons to make them equal
  },
};
