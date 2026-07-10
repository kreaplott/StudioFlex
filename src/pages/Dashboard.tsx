import { useEffect, useState } from "react";
import type { TemplateMeta } from "../types/TemplateIndex";

type Category = {
  id: string;
  name: string;
  templates: TemplateMeta[];
};

type TemplateIndex = {
  categories: Category[];
};

type DashboardProps = {
  onOpenEditor: (template: TemplateMeta) => void;
};

export default function Dashboard({
  onOpenEditor,
}: DashboardProps) {
  const [data, setData] = useState<TemplateIndex | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  useEffect(() => {
    fetch("/templates/index.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return <p style={{ padding: 40 }}>Lade Vorlagen...</p>;
  }

  if (selectedCategory) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <button
            style={styles.backButton}
            onClick={() => setSelectedCategory(null)}
          >
            ← Kategorien
          </button>

          <h1>{selectedCategory.name}</h1>

          <div style={styles.grid}>
            {selectedCategory.templates.map((template) => (
              <div key={template.id} style={styles.card}>
                <h2>{template.name}</h2>

                <p>{template.folder}</p>

                <button
                  style={styles.button}
                onClick={() => onOpenEditor(template)}
                >
                  Bearbeiten
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1>🌿 StudioFlex</h1>

        <p style={styles.subtitle}>
          Produktkategorien
        </p>

        <div style={styles.grid}>
          {data.categories.map((category) => (
            <div
              key={category.id}
              style={styles.card}
              onClick={() => setSelectedCategory(category)}
            >
              <h2>{category.name}</h2>

              <p>
                {category.templates.length} Vorlagen
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F7F5F1",
    fontFamily: "Segoe UI",
    padding: 40,
  },

  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },

  subtitle: {
    color: "#8A7B6A",
    marginBottom: 30,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: 25,
  },

  card: {
    background: "white",
    padding: 24,
    borderRadius: 18,
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
  },

  button: {
    marginTop: 20,
    padding: "12px 18px",
    border: "none",
    borderRadius: 12,
    background: "#A8B89A",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
  },

  backButton: {
    marginBottom: 20,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 700,
  },
};