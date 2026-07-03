export default function Canvas() {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#F7F5F1",
      }}
    >
      <div
        style={{
          width: 500,
          height: 700,
          background: "white",
          borderRadius: 20,
          boxShadow: "0 15px 35px rgba(0,0,0,.08)",
        }}
      />
    </main>
  );
}