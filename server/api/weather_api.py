from flask import Blueprint, jsonify, request
import os
import requests
from dotenv import load_dotenv
import re

load_dotenv()

weather_api_blueprint = Blueprint('weather_api', __name__)

@weather_api_blueprint.route('/api/weather-data', methods=['GET', 'POST'])
def get_weather_data():
    api_key = os.getenv('API_KEY')
    lat = request.args['lat']
    lon = request.args['lon']
    lang = request.args['lang']
    
    def valid_params(lat, lon, lang):
        def check_lang(lang):
            pattern = re.compile(r'^[a-z]{2}_[a-z]{2}$')
            print(lang, f'| Language available >> {bool(pattern.match(lang))}')
            return bool(pattern.match(lang))
        def check_coordinates(lat, lon):
            try:
                lat = float(lat)
                lon = float(lon)
                print(lat, lon, f'|{type(lat)}|{type(lon)}')
            except ValueError:
                return False
            else: return True
        
        if check_coordinates(lat, lon) and check_lang(lang) : return True
        else: return False

    if not api_key:
        print('ERROR: secrets not defined')
        return jsonify({'error': 'Internal Error'}), 500
    if not valid_params(lat, lon, lang):
        print(valid_params(lat, lon, lang))
        return jsonify({'error': 'Bad Request'}), 400

    
    api_url = f'https://api.openweathermap.org/data/3.0/onecall?&appid={api_key}&lat={lat}&lon={lon}&lang={lang}&exclude=minutely'
    headers = {'Authorization': f'Bearer {api_key}'}
    response = requests.get(api_url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Something Went Wrong'}), 500

