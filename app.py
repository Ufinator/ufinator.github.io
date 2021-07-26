import flask
from dotenv import load_dotenv
from os import getenv
from flask import Flask, render_template, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.middleware.proxy_fix import ProxyFix
import mysql.connector

load_dotenv()

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
limiter = Limiter(app, key_func=get_remote_address)


@app.route('/')
@limiter.exempt
def index():
    return render_template('index.html')


@app.route('/projects/')
@limiter.exempt
def projects():
    return render_template('project.html')


@app.route('/api/projects/')
@limiter.limit("10/5seconds")
@limiter.limit("50/20seconds")
def apipro():
    cnx = mysql.connector.connect(
        host=getenv("DBHOST"),
        port=getenv("DBPORT"),
        user=getenv("DBUSER"),
        password=getenv("DBPASSWORD"),
        database=getenv("DBDATABASE")
    )
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM projects")
    data = cursor.fetchall()
    return jsonify(data)


@app.errorhandler(429)
def too_many_requests(e):
    return jsonify({"error": True, "code": 0}), 429


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=getenv("PORT"), threaded=True)
