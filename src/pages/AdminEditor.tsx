import { useEffect, useRef, useState } from "react";
import { GOOGLE_FONTS } from "../data/fonts";
import { getAutoFontSize } from "../engine/text";
import type { TemplateMeta } from "../types/TemplateIndex";

type TextField = {
  id: string;
  label: string;
  type: "text" | "textarea";
  defaultValue: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontFamily: string;
  allowedFonts: string[];
  fontSize: number;
  minFontSize: number;
  maxFontSize: number;
  fontWeight: number;
  color: string;
  rotation: number;
  align: "left" | "center" | "right";
  verticalAlign: "top" | "middle" | "bottom";
  maxCharacters: number;
  multiline: boolean;
  autoResize: boolean;
  editableText: boolean;
  editableFontFamily: boolean;
  editableFontSize: boolean;
  editableColor: boolean;
};

type AdminEditorProps = {
  template: TemplateMeta;
  onSwitchMode: () => void;
  onBackToDashboard: () => void;
};

export default function AdminEditor({
  template,
  onSwitchMode,
  onBackToDashboard,
}: AdminEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

 const [templateName, setTemplateName] = useState("");
const [templateId, setTemplateId] = useState(template.folder);
const [background, setBackground] = useState("");
  const [fields, setFields] = useState<TextField[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [placementMode, setPlacementMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const selectedField = fields.find((f) => f.id === selectedId);
useEffect(() => {
  const saved = localStorage.getItem("studioflex-admin-draft");

  if (saved) {
    const draft = JSON.parse(saved);

    setTemplateName(draft.templateName ?? "Toffiffee Danke 1");
    setTemplateId(draft.templateId ?? "Toffiffee/Danke1");
    setBackground(
      draft.background ??
        "`/templates/${template.folder}/${template.background}`"
    );
    setFields(draft.fields ?? []);
  }

  setIsLoaded(true);
}, []);

useEffect(() => {
  if (!isLoaded) return;

  localStorage.setItem(
    "studioflex-admin-draft",
    JSON.stringify({
      templateName,
      templateId,
      background,
      fields,
    })
  );
}, [isLoaded, templateName, templateId, background, fields]);
  useEffect(() => {
  fetch(`/templates/${template.folder}/config.json`)
    .then((r) => r.json())
    .then((config) => {
      setTemplateName(config.name);
      setTemplateId(config.templateId);
     setBackground(
  `/templates/${template.folder}/${template.adminBackground ?? template.background}`
);
      setFields(config.fields);
    });
}, [template.folder]);

function addFieldAt(x: number, y: number) {
    const id = `field-${Date.now()}`;

    const newField: TextField = {
      id,
      label: "Neues Textfeld",
      type: "text",
      defaultValue: "Text",
      x,
      y,
      width: 250,
      height: 70,
      fontFamily: "Georgia",
      allowedFonts: GOOGLE_FONTS,
      fontSize: 36,
      minFontSize: 10,
      maxFontSize: 80,
      fontWeight: 700,
      color: "#3F3A36",
      rotation: 0,
      align: "center",
      verticalAlign: "middle",
      maxCharacters: 40,
      multiline: false,
      autoResize: true,
      editableText: true,
      editableFontFamily: false,
      editableFontSize: true,
      editableColor: false,
    };

    setFields([...fields, newField]);
    setSelectedId(id);
    setPlacementMode(false);
  }
  

  function updateField(id: string, updates: Partial<TextField>) {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  }

  function handleCanvasClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!placementMode) return;

    const rect = e.currentTarget.getBoundingClientRect();
    addFieldAt(e.clientX - rect.left, e.clientY - rect.top);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();

  if (resizingId) {
    const field = fields.find((f) => f.id === resizingId);
    if (!field) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    updateField(resizingId, {
      width: Math.max(30, (mouseX - field.x) * 2),
      height: Math.max(20, (mouseY - field.y) * 2),
    });

    return;
  }

    if (!draggingId) return;

    updateField(draggingId, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleBackgroundUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setBackground(url);
  }

  function downloadConfig() {
     const config = {
      templateId,
      name: templateName,
      version: "0.9",

      canvas: {
        width: 420,
        height: 594,
      },

      fields,
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "config.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>
          🌿 Studio<span style={{ color: "#A8B89A" }}>Flex</span> by kreaplott
        </h1>

        <div style={{ display: "flex", gap: 12 }}>

  <button
    onClick={onBackToDashboard}
    style={styles.secondaryButton}
  >
    ← Dashboard
  </button>

  <button
    onClick={onSwitchMode}
    style={styles.secondaryButton}
  >
    👤 Kundenmodus
  </button>

  <button
    onClick={downloadConfig}
    style={styles.saveButton}
  >
    config.json herunterladen
  </button>

</div>
      </header>

      <div style={styles.layout}>
        <aside style={styles.sidebar}>
          <h2>Template Builder</h2>

          <label>Template Name</label>
          <input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            style={styles.input}
          />

          <label>Template ID</label>
          <input
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            style={styles.secondaryButton}
          >
            Hintergrund laden
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleBackgroundUpload}
            style={{ display: "none" }}
          />

          <button
            onClick={() => setPlacementMode(true)}
            style={{
              ...styles.primaryButton,
              marginTop: 14,
              background: placementMode ? "#8A7B6A" : "#A8B89A",
            }}
          >
            + Textfeld platzieren
          </button>

          <h3 style={{ marginTop: 28 }}>Textfelder</h3>

          {fields.map((field) => (
            <button
              key={field.id}
              onClick={() => setSelectedId(field.id)}
              style={{
                ...styles.fieldButton,
                background: field.id === selectedId ? "#EEF3E7" : "white",
              }}
            >
              {field.label}
            </button>
          ))}
        </aside>

        <section style={styles.workspace}>
          <div
            style={{
              ...styles.card,
              cursor: placementMode ? "crosshair" : "default",
            }}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseUp={() => {
              setDraggingId(null);
              setResizingId(null);
            }}
            onMouseLeave={() => {
              setDraggingId(null);
              setResizingId(null);
            }}
          >
            <img src={background} alt="Vorlage" style={styles.background} draggable={false} />

           {fields.map((field) => {
            const displayFontSize = getAutoFontSize(field, field.defaultValue);

            return (
              <div
                key={field.id}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setSelectedId(field.id);
                  setDraggingId(field.id);
                }}
                style={{
                  position: "absolute",

                  left: field.x,
                  top: field.y,

                  width: field.width,
                  height: field.height,

                  transform: `translate(-50%, -50%) rotate(${field.rotation}deg)`,

                  fontFamily: field.fontFamily,
                  fontSize: displayFontSize,
                  fontWeight: field.fontWeight,
                  color: field.color,

                  textAlign: field.align,
                  whiteSpace: field.multiline ? "pre-line" : "nowrap",
                  lineHeight: 1.0,
                  overflow: "hidden",

                  display: "flex",
                  alignItems: "center",

                  justifyContent:
                    field.align === "left"
                      ? "flex-start"
                      : field.align === "right"
                      ? "flex-end"
                      : "center",

                  boxSizing: "border-box",

                  padding: 4,

                  cursor: "move",
                  userSelect: "none",

                  border:
                    selectedId === field.id
                      ? "2px dashed #A8B89A"
                      : "2px dashed rgba(168,184,154,.35)",

                  borderRadius: 8,
                }}
              >
                {field.defaultValue}
                {selectedId === field.id && (
              <div
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setResizingId(field.id);
                }}
                style={{
                  position: "absolute",
                  right: -6,
                  bottom: -6,
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: "#A8B89A",
                  border: "2px solid white",
                  boxShadow: "0 2px 6px rgba(0,0,0,.2)",
                  cursor: "nwse-resize",
                }}
              />
            )}
            </div>
            );
          })}
          </div>
        </section>

        <aside style={styles.properties}>
          <h2>Eigenschaften</h2>

          {selectedField ? (
            <>
              <label>Bezeichnung</label>
              <input
                value={selectedField.label}
                onChange={(e) =>
                  updateField(selectedField.id, { label: e.target.value })
                }
                style={styles.input}
              />

              <label>Standardtext</label>
              <textarea
                value={selectedField.defaultValue}
                onChange={(e) =>
                  updateField(selectedField.id, { defaultValue: e.target.value })
                }
                style={{ ...styles.input, minHeight: 90 }}
              />

              <label>Typ</label>
              <select
                value={selectedField.type}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    type: e.target.value as "text" | "textarea",
                    multiline: e.target.value === "textarea",
                  })
                }
                style={styles.input}
              >
                <option value="text">Einzeiliger Text</option>
                <option value="textarea">Mehrzeiliger Text</option>
              </select>
              <label>Breite</label>

              <input
                type="number"
                value={selectedField.width}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    width: Number(e.target.value),
                  })
                }
                style={styles.input}
              />

              <label>Höhe</label>

              <input
                type="number"
                value={selectedField.height}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    height: Number(e.target.value),
                  })
                }
                style={styles.input}
              />
              <label>Schriftart</label>
              <select
                value={selectedField.fontFamily}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    fontFamily: e.target.value,
                  })
                }
                style={{
                  ...styles.input,
                  fontFamily: selectedField.fontFamily,
                }}
              >
                {GOOGLE_FONTS.map((font) => (
                  <option
                    key={font}
                    value={font}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </option>
                ))}
              </select>
              <label>Schriftgröße</label>
              <input
                type="number"
                value={selectedField.fontSize}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    fontSize: Number(e.target.value),
                  })
                }
                style={styles.input}
              />

              <label>Farbe</label>
              <input
                type="color"
                value={selectedField.color}
                onChange={(e) =>
                  updateField(selectedField.id, { color: e.target.value })
                }
                style={styles.colorInput}
              />

              <label>Drehung</label>
              <input
                type="number"
                value={selectedField.rotation}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    rotation: Number(e.target.value),
                  })
                }
                style={styles.input}
              />

              <label>Max. Zeichen</label>
              <input
                type="number"
                value={selectedField.maxCharacters}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    maxCharacters: Number(e.target.value),
                  })
                }
                style={styles.input}
              />
<h3 style={{ marginTop: 10 }}>Kundenoptionen</h3>

<label style={styles.checkboxLabel}>
  <input
    type="checkbox"
    checked={selectedField.editableText}
    onChange={(e) =>
      updateField(selectedField.id, {
        editableText: e.target.checked,
      })
    }
  />
  Text bearbeiten
</label>

<label style={styles.checkboxLabel}>
  <input
    type="checkbox"
    checked={selectedField.editableFontFamily}
    onChange={(e) =>
      updateField(selectedField.id, {
        editableFontFamily: e.target.checked,
      })
    }
  />
  Schriftart ändern
</label>

<label style={styles.checkboxLabel}>
  <input
    type="checkbox"
    checked={selectedField.editableFontSize}
    onChange={(e) =>
      updateField(selectedField.id, {
        editableFontSize: e.target.checked,
      })
    }
  />
  Schriftgröße ändern
</label>

<label style={styles.checkboxLabel}>
  <input
    type="checkbox"
    checked={selectedField.editableColor}
    onChange={(e) =>
      updateField(selectedField.id, {
        editableColor: e.target.checked,
      })
    }
  />
  Schriftfarbe ändern
</label>
              <button
                onClick={() => {
                  setFields(fields.filter((f) => f.id !== selectedField.id));
                  setSelectedId(null);
                }}
                style={styles.deleteButton}
              >
                Textfeld löschen
              </button>
            </>
          ) : (
            <p>Wähle ein Textfeld aus oder platziere ein neues.</p>
          )}
        </aside>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F7F5F1",
    fontFamily: "Segoe UI, sans-serif",
    color: "#3F3A36",
  },
  header: {
    height: 72,
    background: "white",
    borderBottom: "1px solid #E6E0D8",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
  },
  logo: { margin: 0, fontSize: 28 },
  layout: {
    display: "grid",
    gridTemplateColumns: "280px 1fr 340px",
    height: "calc(100vh - 72px)",
  },
  sidebar: {
    background: "white",
    borderRight: "1px solid #E6E0D8",
    padding: 24,
    overflow: "auto",
  },
  workspace: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  card: {
    width: 420,
    height: 594,
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    boxShadow: "0 15px 35px rgba(0,0,0,.12)",
    background: "white",
  },
  background: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  properties: {
    background: "white",
    borderLeft: "1px solid #E6E0D8",
    padding: 24,
    overflow: "auto",
  },
  primaryButton: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryButton: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "1px solid #E6E0D8",
    background: "white",
    cursor: "pointer",
    fontWeight: 700,
  },
  saveButton: {
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    background: "#A8B89A",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  fieldButton: {
    width: "100%",
    display: "block",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    border: "1px solid #E6E0D8",
    textAlign: "left",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: 12,
    margin: "8px 0 18px",
    borderRadius: 10,
    border: "1px solid #E6E0D8",
    fontSize: 15,
    boxSizing: "border-box",
  },
  colorInput: {
    width: "100%",
    height: 44,
    margin: "8px 0 18px",
  },
  deleteButton: {
    width: "100%",
    padding: 13,
    borderRadius: 12,
    border: "none",
    background: "#C05C63",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  checkboxLabel: {
  display: "flex",
  alignItems: "center",
  gap: 10,
  margin: "8px 0 12px",
  fontSize: 15,
  },
};