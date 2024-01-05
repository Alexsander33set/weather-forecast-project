import os
from flask import Flask, send_from_directory, request
from gevent.pywsgi import WSGIServer
from dotenv import load_dotenv
from api.weather_api import weather_api_blueprint
from api.autocomplete import autocomplete_blueprint

load_dotenv()
PORT = int(os.getenv('PORT'))

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('./templates', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('./templates', path)

@app.route('/get_ip', methods=['GET'])
def get_ip():
    return request.remote_addr

# ----- api routes -----
app.register_blueprint(weather_api_blueprint)
app.register_blueprint(autocomplete_blueprint)

if __name__ == '__main__':
    # app.run(debug=False)
    http_server = WSGIServer(('0.0.0.0', PORT), app)
    http_server.serve_forever()

