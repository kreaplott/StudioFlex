# Changelog

## v1.0.0 Beta

- Dashboard
- Customer Editor
- PDF Export
- Passwortschutz
- GitHub
- Netlify
- Responsive Layout

## v1.0.0 Beta

### Neu

- Responsive Customer Editor
- GitHub Integration
- Netlify Auto Deploy
- Google Fonts Bibliothek
- Zentrale Fontverwaltung
- Hexcode-Eingabe
- Customer-Optionen übersichtlicher
- iPhone PDF-Export behoben
- AutoResize im Admin korrigiert
- neue Vorlage hinzugefügt (Geburtstag_Goose)

## v1.0.1 Beta

### Neu

#### Vorlagenverwaltung
- Trennung von `index.json` und `config.json`
- `config.json` enthält nur noch Layout- und Feldinformationen
- `index.json` verwaltet Ordnerstruktur und Vorlageninformationen
- Unterstützung für verschachtelte Vorlagenordner
- Einführung des Playground-Bereichs für Testvorlagen
- Hintergrundbilder werden zentral über die `index.json` verwaltet
- Unterstützung separater Hintergrundbilder für Admin- und Kundenansicht (`adminBackground`)

#### Customer Editor
- Responsive Darstellung für Smartphones und Tablets optimiert
- PDF-Button dauerhaft unterhalb des Bearbeitungsbereichs positioniert
- Nicht bearbeitbare Felder werden automatisch ausgeblendet
- Zeichenzähler für Textfelder ergänzt
- Warnhinweis bei Überschreitung der empfohlenen Zeichenanzahl
- Farbwahl zeigt zusätzlich den Hex-Code an
- Verbesserte Gruppierung und Übersichtlichkeit der Bearbeitungsfelder

#### Admin Editor
- Admin- und Kundenansicht verwenden nun dieselbe AutoResize-Berechnung
- Darstellung von Textfeldern zwischen Admin- und Kundenansicht vereinheitlicht
- Unterstützung separater Admin-Hintergrundbilder mit Hilfslinien

#### Schriften
- Zentrale Schriftverwaltung eingeführt (`fonts.ts`)
- Google-Fonts-Bibliothek deutlich erweitert
- Über 40 hochwertige Schriftarten integriert
- Schriftarten werden im Auswahlfeld direkt in ihrer jeweiligen Schrift dargestellt

#### PDF & Druck
- PDF-Erstellung auf iPhone (Safari) korrigiert
- PDF-Export auf mobilen Geräten verbessert
- PDF wird im echten A4-Format erzeugt
- Ausdruck in Originalgröße (100 %) möglich

### Verbesserungen

- Einheitlicher Zeilenabstand für mehrzeilige Texte
- Kundenoberfläche aufgeräumt und kompakter gestaltet
- Farbauswahl benutzerfreundlicher gestaltet
- Customer Editor auf kleinen Displays deutlich verbessert
- Architektur der Vorlagenverwaltung vereinfacht
- Vorbereitung für beliebig viele Produkte und Vorlagen geschaffen
- Projektstruktur für zukünftige Erweiterungen optimiert
- Dokumentation und Projektstruktur erweitert (PROJECT_CONTEXT, MVP, CHANGELOG, ROADMAP, IDEEN)

### Fehlerbehebungen

- Unterschiedliche Darstellung zwischen Admin- und Kundenansicht behoben
- AutoResize im Admin an das Kunden-Rendering angepasst
- Hintergrundbilder werden wieder korrekt geladen
- PDF-Export auf iPhone funktionsfähig
- Druckgröße der PDF entspricht nun dem Originalformat
- Mehrere TypeScript- und Architekturprobleme beim Umbau der Vorlagenverwaltung behoben