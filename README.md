Pasos para poder Probar la pagina:

1-Crear un servidor SQL local en el dispositivo.

2-Correr el script "Login Database.sql" para crear la base de datos y sus tablas necesarias para guardar y buscar los usuarios registrados.

3-Habra la barra de comandos de visual studio(Progama Sugerido).

4-Crea un Virtual Environment usando el comando: "py -3 -m venv __________" <--- Ingrese el nombre de su Virtual Environment.

5-Activar el Virtual Environment usando el comando: "__________\Scripts\activate".

6-Se necesitan las librerias "Flask", "flask-mysqldb" y "bcrypt", tendras que instalarlas por medio de del commando: "pip install Flask flask-mysqldb bcrypt".

7-Correr el commando "python .\scr\app.py" para empezar a hostear localmente la app.

8-Habrir la ip que se mostro en la barra de commandos y usarla en un navegador, ejemplo: "http://127.0.0.1:5000/".

Despues de seguir estos pasos deberias ser capaz de hostear tanto el servidor MySql y la pagina web de manera local, y seras capaz de utilizarla
