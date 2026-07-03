# 🌿 StudioFlex Developer Guide

Version: MVP Beta 1
Stand: Juli 2026

---

# Vision

StudioFlex ist ein webbasiertes Tool zur Erstellung personalisierbarer Druckvorlagen für digitale Etsy-Produkte.

Ziel ist es, den gesamten Workflow vom Template bis zum fertigen Kundendownload innerhalb einer einzigen Anwendung abzubilden.

---

# Zielgruppe

StudioFlex wird primär für den eigenen Etsy-Shop entwickelt.

Später soll die Software auch für andere Shops oder Anwender nutzbar sein.

---

# Tech Stack

Frontend

- React
- TypeScript
- Vite

Bibliotheken

- html2canvas
- jsPDF

Deployment

- GitHub
- Netlify

Versionierung

- Git

---

# Projektstruktur

public/

templates/

Toffiffee/

Danke1/

background.png

config.json

links.json

index.json

src/

pages/

AdminEditor.tsx

CustomerEditor.tsx

Dashboard.tsx

engine/

text.ts

types/

Template.ts

---

# Architektur

Dashboard

↓

Kategorie

↓

Vorlage

↓

Admin Editor

↓

Customer Editor

↓

PDF

---

# Aktueller MVP Umfang

## Dashboard

✔ Kategorien

✔ Vorlagen

✔ Passwortgeschützter Zugang

---

## Admin Editor

✔ Hintergrund laden

✔ Textfelder erstellen

✔ Positionieren

✔ Größenänderung

✔ Rotation

✔ Ausrichtung

✔ Kundenoptionen definieren

✔ config.json herunterladen

---

## Customer Editor

✔ Live Vorschau

✔ Text bearbeiten

✔ Schriftgröße

✔ Schriftart

✔ Schriftfarbe

✔ Hexcode

✔ Responsive Layout

✔ PDF Export

---

# Deployment

Entwicklung

VS Code

↓

Git

↓

GitHub

↓

Netlify

↓

Website

Workflow

git add .

git commit -m "Beschreibung"

git push

↓

Netlify veröffentlicht automatisch.

---

# Template System

Jede Vorlage besteht aus

background.png

config.json

Beispiel

/templates/Toffiffee/Danke1

---

# Template Config

Jede config enthält

Canvas

Textfelder

Kundenoptionen

Schriftarten

Farben

Positionen

Größen

---

# Customer Link

Aktuell

#/e/<token>

Beispiel

#/e/kp-toffi-danke-7Xq92LmA

---

# Passwortschutz

Admin

Passwort

studioflex

Customer

kein Passwort

---

# Git Workflow

Neue Änderung

git add .

git commit -m "Beschreibung"

git push

---

# MVP Status

Technisch abgeschlossen.

Vor Veröffentlichung

□ Mobile weiter testen

□ Ersten kompletten Testkauf durchführen

□ Erste Produkte erstellen

---

# Nach MVP

## Dashboard

□ Vorschaukarten

□ Dashboard Design

---

## Templates

□ automatische Ordnererkennung

□ Preview.png automatisch erzeugen

□ Vorlagen duplizieren

□ Vorlagen löschen

---

## Speicherung

□ Desktop App

oder

□ kleines Backend

für automatisches Speichern

(config.json nicht mehr herunterladen)

---

## Cloud

□ Cloud Synchronisation

□ Login

□ Mehrbenutzer

---

## Editor

□ Branding Schriftarten

□ Weitere Textwerkzeuge

□ QR Codes

□ Bilder

---

# Design Prinzipien

StudioFlex soll

einfach

ruhig

minimalistisch

verständlich

wirken.

Neue Funktionen werden nur umgesetzt wenn sie

den Etsy Workflow verbessern

oder

den Kunden schneller zum fertigen PDF bringen.

---

# Entwicklungsregel

Vor jeder neuen Funktion wird gefragt:

"Braucht das der erste Etsy Kunde?"

Wenn Nein

↓

Roadmap

Wenn Ja

↓

MVP

---

# StudioFlex Philosophie

Nicht möglichst viele Funktionen.

Sondern

der einfachste Weg

von

Template

↓

Personalisierung

↓

PDF

↓

glücklicher Kunde.