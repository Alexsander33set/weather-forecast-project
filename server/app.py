from flask import Flask, send_from_directory
from api.weather_api import weather_api_blueprint  # Renomeado para evitar conflitos

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('../client/dist', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('../client/dist', path)

# api routes
app.register_blueprint(weather_api_blueprint)  # Use o nome correto para o Blueprint

if __name__ == '__main__':
    app.run(debug=False)
