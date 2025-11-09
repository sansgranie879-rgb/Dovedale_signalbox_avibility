# status-testv2 — deploy na GitHub Pages + Web Push (instrukcja)

WIP WIP WIP WIP WIP WIP WIP 

Krótko i praktycznie:

1) Stwórz repo na GitHub (np. `status-testv2`) i wrzuć pliki:
   - index.html
   - sw.js
   - opcjonalnie: icon-192.png, badge-72.png

2) Push:
   git init
   git add .
   git commit -m "Initial"
   git branch -M main
   git remote add origin git@github.com:<twoj-login>/status-testv2.git
   git push -u origin main

3) Włącz GitHub Pages:
   - Settings → Pages → Branch: main / Folder: / (root) → Save
   - Po chwili GitHub wystawi adres https://<twoj-login>.github.io/status-testv2/ (HTTPS automatyczne)

4) Generowanie kluczy VAPID (na maszynie dev):
   node -e "console.log(require('web-push').generateVAPIDKeys())"
   Wstaw PUBLIC_VAPID_KEY do index.html (zmienna PUBLIC_VAPID_KEY) oraz PUBLIC/PRIVATE do push-server-example.js.

5) Uruchamianie testowego serwera push (jeśli chcesz wysyłać powiadomienia z własnego backendu):
   - Zainstaluj zależności: `npm i express body-parser web-push`
   - Uzupełnij klucze VAPID w push-server-example.js
   - Uruchom `node push-server-example.js`
   - Gdy użytkownik w przeglądarce kliknie "Włącz powiadomienia", przeglądarka wyśle subskrypcję do endpointu /subscribe (serwera hostowanego na tym samym hostzie lub CORS jeśli inny)
   - Wywołaj POST /send z payloadem { title, body, url } aby wysłać testowe powiadomienie

Uwaga i wskazówki:
- GitHub Pages używa HTTPS — dzięki temu service worker i Push API będą działać poprawnie.
- Dla testów lokalnych możesz używać localhost (SW działa tam bez HTTPS).
- W produkcji zapisz subskrypcje w bezpiecznym storage (baza danych). Subskrypcje mogą wygasać lub być unieważnione.
- Jeśli hostujesz swój backend na innym domenie niż GitHub Pages, zadbaj o CORS i HTTPS dla backendu.
