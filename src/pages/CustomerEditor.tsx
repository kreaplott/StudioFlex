import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { TemplateConfig } from "../types/Template.ts";
import { getAutoFontSize } from "../engine/text.ts";

type CustomerEditorProps = {
  templateFolder: string;
};

export default function CustomerEditor({
  templateFolder,
}: CustomerEditorProps) {
  const [config, setConfig] = useState<TemplateConfig | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [fontSizes, setFontSizes] = useState<Record<string, number>>({});
 const [fontFamilies, setFontFamilies] = useState<Record<string, string>>({});
  const [colors, setColors] = useState<Record<string, string>>({});
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   fetch(`/templates/${templateFolder}/config.json`)
      .then((res) => res.json())
      .then((data: TemplateConfig) => {
        setConfig(data);

        const initialValues: Record<string, string> = {};
        data.fields.forEach((field) => {
          initialValues[field.id] = field.defaultValue;
        });

        setValues(initialValues);
        const initialFontSizes: Record<string, number> = {};

        data.fields.forEach((field) => {
          initialFontSizes[field.id] = field.fontSize;
        });

        setFontSizes(initialFontSizes);
        const initialFontFamilies: Record<string, string> = {};

        data.fields.forEach((field) => {
          initialFontFamilies[field.id] = field.fontFamily;
        });

        setFontFamilies(initialFontFamilies);
        const initialColors: Record<string, string> = {};

        data.fields.forEach((field) => {
          initialColors[field.id] = field.color;
        });

setColors(initialColors);
      });
  }, []);

  async function downloadPdf() {
  if (!cardRef.current || !config) return;

  const canvas = await html2canvas(cardRef.current, {
    scale: 3,
    backgroundColor: null,
    useCORS: true,
  });

  const imageData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`${config.templateId.replaceAll("/", "-")}.pdf`);
  }

  if (!config) {
    return <p style={{ padding: 40 }}>Vorlage wird geladen...</p>;
  }

    const previewWidth = 420;
    const previewHeight = 594;
    const scale = 1;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.logo}>
            🌿 Studio<span style={{ color: "#A8B89A" }}>Flex</span> by kreaplott
          </h1>
          <p style={styles.subtitle}>Personalisiere deine Vorlage.</p>
        </header>

        <div style={styles.layout}>
          <section style={styles.previewPanel}>
            <div
              ref={cardRef}
              style={{
                ...styles.card,
                width: previewWidth,
                height: previewHeight,
              }}
            >
              <img
                src={config.background}
                alt={config.name}
                style={styles.background}
              />

              {config.fields.map((field) => {
                const value = values[field.id] ?? "";
                const fieldWithCustomerFontSize = {
  ...field,
  fontSize: fontSizes[field.id] ?? field.fontSize,
};

const fontSize =
  getAutoFontSize(fieldWithCustomerFontSize, value) * scale;


                return (
                  <div
                    key={field.id}
                    style={{
                      position: "absolute",

                      left: field.x * scale,
                      top: field.y * scale,

                      width: field.width * scale,
                      height: field.height * scale,

                      transform: `translate(-50%, -50%) rotate(${field.rotation}deg)`,

                      fontFamily: fontFamilies[field.id] ?? field.fontFamily,
                      fontSize,
                      fontWeight: field.fontWeight,
                      color: colors[field.id] ?? field.color,

                      textAlign: field.align,
                      whiteSpace: field.multiline ? "pre-line" : "nowrap",
                      lineHeight: 1.2,

                      overflow: "hidden",

                      display: "flex",
                      alignItems:
                        field.verticalAlign === "top"
                          ? "flex-start"
                          : field.verticalAlign === "bottom"
                          ? "flex-end"
                          : "center",

                      justifyContent:
                        field.align === "left"
                          ? "flex-start"
                          : field.align === "right"
                          ? "flex-end"
                          : "center",

                      boxSizing: "border-box",
                      padding: 4,
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          </section>

         <aside style={styles.formPanel}>
  <h2 style={styles.formTitle}>{config.name}</h2>

  <div style={styles.formContent}>
    {config.fields.map((field) => (
      <div key={field.id} style={styles.fieldCard}>
        <h3 style={styles.fieldTitle}>{field.label}</h3>

        {field.editableText && (
          <div style={styles.optionGroup}>
            <span style={styles.sectionTitle}>Text</span>

            {field.type === "textarea" ? (
              <textarea
                value={values[field.id] ?? ""}
                maxLength={field.maxCharacters}
                onChange={(e) =>
                  setValues({ ...values, [field.id]: e.target.value })
                }
                rows={5}
                style={{ ...styles.input, resize: "vertical" }}
              />
            ) : (
              <input
                value={values[field.id] ?? ""}
                maxLength={field.maxCharacters}
                onChange={(e) =>
                  setValues({ ...values, [field.id]: e.target.value })
                }
                style={styles.input}
              />
            )}
          </div>
        )}

        {(field.editableFontSize ||
          field.editableFontFamily ||
          field.editableColor) && (
          <div style={styles.optionGroup}>
            <span style={styles.sectionTitle}>Darstellung</span>

            {field.editableFontSize && (
              <>
                <label style={styles.label}>Schriftgröße</label>
                <input
                  type="number"
                  value={fontSizes[field.id] ?? field.fontSize}
                  min={field.minFontSize}
                  max={field.maxFontSize}
                  onChange={(e) =>
                    setFontSizes({
                      ...fontSizes,
                      [field.id]: Number(e.target.value),
                    })
                  }
                  style={styles.input}
                />
              </>
            )}

            {field.editableFontFamily && (
              <>
                <label style={styles.label}>Schriftart</label>
                <select
                  value={fontFamilies[field.id] ?? field.fontFamily}
                  onChange={(e) =>
                    setFontFamilies({
                      ...fontFamilies,
                      [field.id]: e.target.value,
                    })
                  }
                  style={styles.input}
                >
                  {(field.allowedFonts ?? [field.fontFamily]).map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </>
            )}

            {field.editableColor && (
              <>
                <label style={styles.label}>Schriftfarbe</label>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <input
                    type="color"
                    value={colors[field.id] ?? field.color}
                    onChange={(e) =>
                      setColors({
                        ...colors,
                        [field.id]: e.target.value,
                      })
                    }
                    style={styles.colorInput}
                  />

                  <input
                    value={colors[field.id] ?? field.color}
                    onChange={(e) => {
                      let value = e.target.value.toUpperCase();

                      if (!value.startsWith("#")) {
                        value = "#" + value;
                      }

                      setColors({
                        ...colors,
                        [field.id]: value,
                      });
                    }}
                    style={{
                      ...styles.input,
                      flex: 1,
                      textTransform: "uppercase",
                    }}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    ))}
  </div>

  <div style={styles.footer}>
    <button onClick={downloadPdf} style={styles.button}>
      PDF erstellen
    </button>
  </div>
</aside>
        </div>
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
    padding: 40,
  },
  container: { maxWidth: 1200, margin: "0 auto" },
  header: { marginBottom: 30 },
  logo: { margin: 0, fontSize: 34 },
  subtitle: { color: "#8A7B6A", marginTop: 8 },
  layout: {
  display: "grid",
  gridTemplateColumns: "1fr 380px",
  gap: 35,
  alignItems: "start",
},
  card: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    background: "white",
  },
  background: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
 formPanel: {
  background: "white",
  borderRadius: 24,
  boxShadow: "0 15px 35px rgba(0,0,0,.08)",
  alignSelf: "start",
  position: "sticky",
  top: 30,
  maxHeight: "calc(100vh - 80px)",

  display: "flex",
  flexDirection: "column",
},
  label: { display: "block", marginBottom: 8, fontWeight: 600 },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "1px solid #E6E0D8",
    fontSize: 16,
    boxSizing: "border-box",
  },
 
colorInput: {
  width: 60,
  height: 46,
  border: "1px solid #E6E0D8",
  borderRadius: 12,
  cursor: "pointer",
  padding: 4,
  background: "white",
},
fieldCard: {
  background: "#F7F5F1",
  border: "1px solid #E6E0D8",
  borderRadius: 18,
  padding: 18,
  marginBottom: 20,
},

fieldTitle: {
  margin: "0 0 16px",
  fontSize: 18,
  color: "#3F3A36",
},

optionGroup: {
  borderTop: "1px solid #E6E0D8",
  paddingTop: 14,
  marginTop: 14,
},

sectionTitle: {
  display: "block",
  marginBottom: 12,
  fontSize: 13,
  fontWeight: 700,
  color: "#8A7B6A",
  textTransform: "uppercase",
  letterSpacing: 0.5,
},

formTitle: {
  margin: 0,
  padding: 30,
},

formContent: {
  flex: 1,
  overflowY: "auto",
  padding: "0 30px 30px",
},

footer: {
  padding: 24,
  borderTop: "1px solid #E6E0D8",
  background: "white",
},

button: {
  width: "100%",
  marginTop: 20,
  padding: 16,
  border: "none",
  borderRadius: 14,
  background: "#A8B89A",
  color: "white",
  fontSize: 17,
  fontWeight: 700,
  cursor: "pointer",
},
};