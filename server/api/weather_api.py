from flask import Blueprint, jsonify, request
import os
import requests
from dotenv import load_dotenv

load_dotenv()

weather_api_blueprint = Blueprint('weather_api', __name__)

@weather_api_blueprint.route('/api/weather-data', methods=['GET', 'POST'])
def get_weather_data():
    api_key = os.getenv('API_KEY')
    api_test = os.getenv('API_TEST')
    
    if not api_key:
        return jsonify({'error': 'API_KEY not configured'}), 500
    if (api_test == 'true'):
      tests = {
          'lat': "-23",
          'lon': "-46",
          'lang': "pt_br"
      }
      
    api_url = f'https://api.openweathermap.org/data/3.0/onecall?&appid={api_key}&lat={tests["lat"]}&lon={tests["lon"]}&lang={tests["lang"]}&exclude=minutely'
    headers = {'Authorization': f'Bearer {api_key}'}
    response = requests.get(api_url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'The data could not be obtained'}), 500
