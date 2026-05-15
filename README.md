# Beelden-Bloemendaal

Eenvoudige, publieke website voor handgemaakte beelden met foto's en korte beschrijvingen.

## Lokaal bekijken

Open `index.html` direct in de browser, of start een lokale server:

```bash
python3 -m http.server 8000
```

Ga daarna naar `http://localhost:8000`.

## Publiek beschikbaar maken

Deze repository bevat een statische website (`index.html` + `styles.css`) en is geschikt voor publicatie via GitHub Pages:

1. Ga naar **Settings** → **Pages**
2. Kies bij **Source**: *Deploy from a branch*
3. Selecteer branch `main` (of de gewenste branch) en map `/ (root)`
4. Sla op; de site wordt daarna publiek bereikbaar via de getoonde URL
