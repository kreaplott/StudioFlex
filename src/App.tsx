import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import AdminEditor from "./pages/AdminEditor";
import CustomerEditor from "./pages/CustomerEditor";
import type { TemplateMeta, TemplateIndex } from "./types/TemplateIndex";

type Mode = "dashboard" | "admin" | "customer";

type LinkEntry = {
  token: string;
  templateId: string;
};

const ADMIN_PASSWORD = "studioflex";

function findTemplateById(index: TemplateIndex, templateId: string) {
  return index.categories
    .flatMap((category) => category.templates)
    .find((template) => template.id === templateId);
}

function App() {
  const [mode, setMode] = useState<Mode>("dashboard");
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateMeta | null>(null);

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [isCheckingLink, setIsCheckingLink] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash.startsWith("#/e/")) {
      setIsCheckingLink(false);
      return;
    }

    const token = hash.replace("#/e/", "");

    Promise.all([
      fetch("/templates/links.json").then((res) => res.json()),
      fetch("/templates/index.json").then((res) => res.json()),
    ])
      .then(
        ([linksData, indexData]: [
          { links: LinkEntry[] },
          TemplateIndex
        ]) => {
          const match = linksData.links.find(
            (link) => link.token === token
          );

          if (!match) {
            alert("Dieser Link ist ungültig.");
            setIsCheckingLink(false);
            return;
          }

          const template = findTemplateById(
            indexData,
            match.templateId
          );

          if (!template) {
            alert("Vorlage wurde nicht gefunden.");
            setIsCheckingLink(false);
            return;
          }

          setSelectedTemplate(template);
          setMode("customer");
          setIsCheckingLink(false);
        }
      )
      .catch((error) => {
        console.error("Fehler beim Laden des Kundenlinks:", error);
        alert("Der Kundenlink konnte nicht geladen werden.");
        setIsCheckingLink(false);
      });
  }, []);

  if (isCheckingLink) {
    return <p style={{ padding: 40 }}>Link wird geprüft...</p>;
  }

  if (!isAdminUnlocked && mode !== "customer") {
    return (
      <main style={styles.page}>
        <div style={styles.loginBox}>
          <h1>🌿 StudioFlex</h1>
          <p>Adminbereich</p>

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button
            style={styles.button}
            onClick={() => {
              if (password === ADMIN_PASSWORD) {
                setIsAdminUnlocked(true);
              } else {
                alert("Falsches Passwort");
              }
            }}
          >
            Einloggen
          </button>
        </div>
      </main>
    );
  }

  if (mode === "admin" && selectedTemplate) {
    return (
      <AdminEditor
        template={selectedTemplate}
        onSwitchMode={() => setMode("customer")}
        onBackToDashboard={() => setMode("dashboard")}
      />
    );
  }

  if (mode === "customer" && selectedTemplate) {
    return <CustomerEditor template={selectedTemplate} />;
  }

  return (
    <Dashboard
      onOpenEditor={(template) => {
        setSelectedTemplate(template);
        setMode("admin");
      }}
    />
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F7F5F1",
    fontFamily: "Segoe UI, sans-serif",
    color: "#3F3A36",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox: {
    width: 360,
    background: "white",
    padding: 32,
    borderRadius: 24,
    boxShadow: "0 15px 35px rgba(0,0,0,.08)",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "1px solid #E6E0D8",
    fontSize: 16,
    boxSizing: "border-box",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    padding: 14,
    border: "none",
    borderRadius: 14,
    background: "#A8B89A",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default App;