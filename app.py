from dotenv import load_dotenv
from os import getenv
from flask import Flask, render_template, jsonify, send_file
from flask_limiter import Limiter
from werkzeug.middleware.proxy_fix import ProxyFix
# import mysql.connector - Not used. More infos below

load_dotenv()

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
limiter = Limiter(app)


@app.route('/')
@limiter.exempt
def index():
    return render_template('index.html')


@app.route('/projects/')
@limiter.exempt
def projects():
    return render_template('project.html')


@app.route('/publickey/')
@limiter.exempt
def publickey():
    return render_template('publickey.html')


@app.route('/publickey/gpg/')
@limiter.limit("5/minutes")
@limiter.exempt
def gpg():
    return send_file('static/assets/mateos_public.asc', attachment_filename='mateos_public.asc')

# Mysql feature not used.

# @app.route('/api/projects/')
# @limiter.limit("10/5seconds")
# @limiter.limit("50/20seconds")
# def apipro():
#     cnx = mysql.connector.connect(
#         host=getenv("DBHOST"),
#         port=getenv("DBPORT"),
#         user=getenv("DBUSER"),
#         password=getenv("DBPASSWORD"),
#         database=getenv("DBDATABASE")
#     )
#     cursor = cnx.cursor()
#     cursor.execute("SELECT * FROM projects")
#     data = cursor.fetchall()
#     return jsonify(data)


@app.errorhandler(429)
def too_many_requests(e):
    return jsonify({"error": True, "code": 0}), 429


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=getenv("PORT"), threaded=True)
