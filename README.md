# [CAOS]
## Descripción
(Breve descripción del proyecto, su propósito y funcionalidades principales. Ejemplo:)
Sistema web para la gestión de gastos y ganancias y tambien graficación. Permite registrar usuarios y tambien logears a través de una interfaz web, conectada a una base de datos MySQL mediante una API desarrollada con Flask.
## Tecnologías utilizadas
### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
### Backend
- Python 3.x
- Flask (microframework)
###  Base de datos
- MySQL
## Funcionalidades
- Registro de usuarios con validacion para frontend y backend encriptado
- Ingreso, calculo, visualizacion y graficacion de gastos contra ganancias
- Capacidad de descargar como pdf su ganancias y gastos
- Conexión con base de datos MySQL
- Mensajes de error y confirmación
- API REST para operaciones CRUD
##  Estructura del proyecto
📁 TP/

├── app.py

├── 📁 static/

│ ├── 📁 img/

│ ├── ayuda.css

│ └── contactos.css

│ └── cookies.css

│ └── grafico.css

│ └── grafico.js

│ └── index.css

│ └── index.js

│ └── informacion.css

│ └── login.js

│ └── menu.js

│ └── privacidad.css

│ └── registro.js

│ └── style.css

│ └── style2.css

│ └── terminos.css

├── 📁 templates/ # (HTML si usás Jinja2 con Flask)

│ └── ayuda.html

│ └── contacto.html

│ └── grafico.html

│ └── index.html

│ └── informacion.html

│ └── login.html

│ └── Politica_cookies.html

│ └── privacidad.html

│ └── register.html

│ └── terminos.html

├── requirements.txt

└── README.md

##  Instalación y ejecución
### 1. Clonar el repositorio

git clone https://github.com/gueba14/gueba14.github.io
cd proyecto-biblioteca
###2. Crear entorno virtual (opcional pero recomendado)
python -m venv venv
source venv/bin/activate   # en Linux/Mac
venv\Scripts\activate.bat  # en Windows
###3. Instalar dependencias
pip install Flask flask-mysqldb bcrypt

###4. Configurar la base de datos
Crear una base de datos en MySQL (ejemplo: geeklogin)
Configurar los datos de conexión en app.py

PYthon

app.py

DB_HOST = 'localhost'
DB_USER = 'tu_usuario'
DB_PASSWORD = 'tu_contraseña'
DB_NAME = 'geeklogin'
###5. Ejecutar el servidor
bash
python app.py
El sistema estará disponible en: http://127.0.0.1:5000

Cómo probar
Ingresar a http://127.0.0.1:5000
Lee información sobre nuesto proyecto
Registrate para poder utilizar nuestra herramienta para gestion de gastos y ganancias


Integrantes del equipo
Octavio Guardamagna
Santiago Guebara
Alan Verón

📄 Licencia
Este proyecto fue desarrollado con fines

Alan Verón

📄 Licencia

Este proyecto fue desarrollado con fines educativos. No posee licencia de distribución comercial.
