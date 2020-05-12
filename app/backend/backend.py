import time
from flask import Flask

app = Flask(__name__)

@app.route('/identity/<keyword>/<location>')
def identity(keyword, location):
    return {
        'keyword': keyword,
        'location': location
    }