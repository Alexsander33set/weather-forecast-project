from flask import Blueprint, jsonify, request
import os
import requests
from dotenv import load_dotenv
import re

load_dotenv()

autocomplete_blueprint = Blueprint('autocomplete', __name__)

@autocomplete_blueprint.route('/api/autocomplete', methods=['GET', 'POST'])
def get_predictions():
    api_key = os.getenv('GOOGLE_API_KEY')
    userInput = request.args['input']
    lang = request.args['lang']
    

    if not api_key:
        print('ERROR: secrets not defined')
        return jsonify({'error': 'Internal Error'}), 500

    
    api_url = f'https://maps.googleapis.com/maps/api/place/autocomplete/json?input={userInput}&language={lang}&types=(cities)&key={api_key}'
    headers = {'Authorization': f'Bearer {api_key}'}
    response = requests.get(api_url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Something Went Wrong'}), 500