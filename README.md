# AI Kanban Board – Prompt Engineering

Gruppenarbeit im Rahmen des DHBW Web Engineering Kurses (Prompt Engineering Assignment).  
**Gruppe:** Jonas Hardardt, Mika Rubenbauer  
**Modell:** Google Gemini (Fast → Pro → Thinking)

---

## Aufgabe

Erstellen eines frontend-only Kanban Boards (HTML, CSS, Vanilla JavaScript) ausschließlich durch Prompt Engineering mit einem LLM.

**Anforderungen:**
- 3 Spalten: ToDo / In Progress / Done
- 3 Kartentypen: Bug (rot), User Story (grün), Task (blau)
- Kartenfelder: Titel, Beschreibung, Storypoints (Stunden)
- Karten erstellen & löschen
- Drag & Drop mit visuellem Feedback
- Responsives Layout (Mobile, Tablet, Desktop)

---

## Ergebnis

Das finale Kanban Board befindet sich in [`Prompt 6/`](Prompt%206/).  
Einfach `index.html` direkt im Browser öffnen – kein Build, keine Dependencies.

**Umfang der finalen Version:** 41 Zeilen HTML · 160 Zeilen CSS · 96 Zeilen JavaScript

---

## Prompt-Iterationen

| # | Modell | Kernänderung | Ergebnis |
|---|---|---|---|
| 1 | Gemini Fast | Erster Versuch – sehr vager Prompt | Kein Design, kein Drag & Drop, fehlende Dateireferenzen |
| 2 | Gemini Fast | Features explizit aufgelistet | Funktional, aber alles in einer Datei, Code-Fehler |
| 3 | Gemini Pro | Vollständiges README als Prompt | Regression – kein Design, keine Funktionalität |
| 4 | Gemini Pro | Drei Dateien, modernes Design explizit gefordert | 3 Dateien, gutes Design, aber UI-Bugs bei langen Eingaben |
| 5 | Gemini Pro | „clean code" + „idiot-proof" ergänzt | Erste produktionsfähige Version, Eingabelimits |
| 6 | Gemini Thinking | Spaltenbreite + Text-Overflow explizit adressiert | Finale, vollständige Version |

### Prompts im Detail

**Prompt 1**
```
Create a Kanban-Board in javascript
```

**Prompt 2**
```
Create a Kanban-Board in javascript with the following features:
3 Columns: ToDo / In Progress / Done
3 Card Types: Bug (red), User Story (green), Task (blue)
Card Fields: Title, Description, Story Points (hours)
Create & Delete cards, Drag & Drop with visual drop zone feedback
Responsive Layout (mobile, tablet, desktop)
```

**Prompt 3**
```
[Vollständiger README-Inhalt als Prompt – zu allgemein für Gemini Pro]
```

**Prompt 4**
```
Create a frontend-only Kanban board with HTML5, CSS3, and vanilla JavaScript
(ES6+, no var, no external frameworks) and implement it in three separate files (.js, .html, .css).
[...] Use a modern, simplistic design approach. It needs to be as user-friendly as possible.
```

**Prompt 5**
```
Create a frontend-only Kanban board with HTML5, CSS3, and vanilla JavaScript
(ES6+, no var, no external frameworks) and implement it in three separate files (.js, .html, .css),
using clean code.
[...] The design must be complete and idiot-proof (e.g. too long input values should not cause
visual or functional problems). Use a modern and clean design with light shadows and rounded edges.
```

**Prompt 6**
```
Create a frontend-only Kanban board with HTML5, CSS3, and vanilla JavaScript
(ES6+, no var, no external frameworks) and implement it in three separate files (.js, .html, .css).
[...] Columns should fill out the complete width of the screen.
Overflow of text entered in the title field should be handled and not overflow over displayed card.
Use a modern, simplistic design approach. It needs to be as user-friendly as possible.
```

---

## Qualitätskriterien

- [x] Semantisches HTML
- [x] Valides HTML (validator.w3.org)
- [x] Modernes JavaScript (kein `var`, ES6+)
- [x] Clean Code
- [x] Drag & Drop mit visuellem Feedback
- [x] Keine externen Frameworks
- [x] Responsives Design (Mobile, Tablet, Desktop)

---

## Learnings

1. **Spezifität entscheidet** – vage Prompts liefern minimale Ergebnisse
2. **Dateistruktur explizit nennen** – „three separate files" war ein Schlüsselschritt
3. **Qualitätsbegriffe als Anweisung** – „clean code", „idiot-proof" verbessern den Output direkt
4. **Edge Cases benennen** – ohne explizite Constraints entstehen UI-Bugs
5. **Modellwahl matters** – Gemini Thinking lieferte das beste Ergebnis für komplexe Anforderungen
6. **Länge ≠ Qualität** – Prompt 3 war der längste und lieferte das schlechteste Ergebnis

---

## Projektstruktur

```
AI-Kanban-Board/
├── README.md
├── Prompt 1/        # Erster Versuch (kein Design, unvollständig)
│   ├── Documentation.txt
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Prompt 2/        # Funktional, aber Single-File
│   ├── Documentation.txt
│   └── index.html
├── Prompt 3/        # Regression – langer Prompt, schlechtes Ergebnis
│   ├── Documentation.txt
│   └── index.html
├── Prompt 4/        # Drei Dateien, aber UI-Bugs
│   ├── Documentation.txt
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Prompt 5/        # Erste produktionsfähige Version
│   ├── Documentation.txt
│   ├── index.html
│   ├── style.css
│   └── script.js
└── Prompt 6/        # Finale Version (Gemini Thinking)
    ├── Documentation.txt
    ├── index.html
    ├── style.css
    └── script.js
```