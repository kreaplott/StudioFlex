export default function Header() {
  return (
    <header
      style={{
        height: "70px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E6E0D8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}
    >
      <h2 style={{ color: "#3F3A36" }}>
        🌿 Studio<span style={{ color: "#A8B89A" }}>Flex</span>
      </h2>

      <span style={{ color: "#8A7B6A" }}>
        by KreaPlott
      </span>
    </header>
  );
}