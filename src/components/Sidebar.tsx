export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "#FFFFFF",
        borderRight: "1px solid #E6E0D8",
        padding: "25px",
      }}
    >
      <h3>Werkzeuge</h3>

      <p style={{ marginTop: 25 }}>🖼 Karte</p>

      <p>✏️ Textfelder</p>

      <p>🎨 Farben</p>
    </aside>
  );
}