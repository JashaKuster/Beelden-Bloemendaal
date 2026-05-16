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

## Website vernieuwen vanuit GitHub

Gebruik voor updates deze snelle werkwijze:

1. Pas bestanden aan (bijv. `index.html`, `styles.css`, `script.js`, afbeeldingen)
2. Commit en push naar de branch die in GitHub Pages staat ingesteld (meestal `main`)
3. GitHub Pages publiceert automatisch opnieuw na de push (meestal binnen 1-3 minuten)
4. Zie je nog oude content? Doe een harde refresh in de browser (`Ctrl+F5` of `Cmd+Shift+R`)

Tip: Controleer in **Actions** of **Pages** of de deployment geslaagd is.
