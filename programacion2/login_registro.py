from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

conexion = mysql.connector.connect(
    host="localhost",
    user="root",        
    password="root",  
    database="Sistemas_usuarios"      
)

@app.route('registrar', methods=['POST'])
def registrar_usuario():
    datos = request.get_json()
    nombre_usuario = datos.get('usuario')
    correo = datos.get('correo')
    clave = datos.get('contrasena')
 # consulta si existe algún usuario con ese nombre en la bd.
    cursor = conexion.cursor(dictionary=True)
    consulta = "SELECT * FROM usuarios WHERE username = %s"
    cursor.execute(consulta, (nombre_usuario,))
    existe = cursor.fetchone()

    if existe:
        cursor.close()
        return jsonify({"exito": False, "mensaje": "usuario ya existe"})
    insertar = "INSERT INTO usuarios (username, email, password) VALUES (%s, %s, %s)"
    cursor.execute(insertar, (nombre_usuario, correo, clave))
    conexion.commit()
    cursor.close()

    return jsonify({"exito": True, "mensaje": "Usuario registrado correctamente"})


@app.route('iniciarsesion', methods=['POST'])
def iniciar_sesion():
    datos = request.get_json()
    nombre_usuario = datos.get('usuario')
    clave = datos.get('contrasena')

    cursor = conexion.cursor(dictionary=True)
    consulta = "SELECT * FROM usuarios WHERE username = %s AND password = %s"
    cursor.execute(consulta, (nombre_usuario, clave))
    usuario = cursor.fetchone()
    cursor.close()

    if usuario:
        return jsonify({"bienvenido": True, "mensaje": "Inicio de sesión exitoso"})
    else:
        return jsonify({"bienvenido": False, "mensaje": "Usuario o contraseña incorrectos"})


if __name__ == '__main__':
    app.run(debug=True)
