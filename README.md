# Praca Inżynierska

Zaprojektowanie i implementacja sprzężenia  zwrotnego w
strukturze informatycznej regulującego jakość transferu  wiedzy pomiędzy
wykładowcami a studentami na WFAiIS


Aby uruchomić projekt należy pobrać a następnie otworzyć folder w którym umieszczone są 'sprzezenie-zwrotne-backend' oraz 'sprzezenie-zwrotne-frontend'.
Następnie przechodzimy do jednego z folderów i z poziomu konsoli, przy użyciu 'npm' uruchamiamy:

'npm install' w celu zainstalowania pakietów potrzebnych w projektach

a następnie odpowiednio:

'sprzezenie-zwrotne-backend':
'npm test' - aby uruchomić testy jednostkowe
lub 'npm start' - aby uruchomić projekt w opcji developerskiej
lub 'node app.js' - aby uruchomić projekt


'sprzezenie-zwrotne-frontend':
'npm start' - aby uruchomić projekt w opcji developerskiej
lub 'npm run build' - budowanie projektu na produkcję

Do działania projektów potrzebne jest posiadanie bazy danych w MongoDB.

Ustawienia projektów:
'.env' - plik ze zmiennymi środowiskowymi projektu backend - tutaj można zmienić port, url do bazy danych MongoDB oraz nazwę, klucze aplikacji oraz dane sesji
Domyślny port w projekcie backend to 5000

Odpowiedni URL - czy też port należy przy zmianie ustawić w projekcie frontend, jako proxy:
plik package.json: "proxy": "...:5000"
oraz do logowania w pliku App.js w komponencie Button (line 112)

Domyślny port projektu frontend to 3000
Dostęp do aplikacji w przeglądarce (po włączeniu obu projektów) mamy pod adresem 'http://localhost:3000/'
