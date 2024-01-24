from flask import Blueprint, jsonify, request
import os
import requests
from dotenv import load_dotenv
# import re

load_dotenv()

ip_geolocation_blueprint = Blueprint('ip-geolocation', __name__)

@ip_geolocation_blueprint.route('/api/ip-geolocation', methods=['GET', 'POST'])
def get_geolocation_by_ip():
    ip_address = request.headers.get('X-Forwarded-For', request.remote_addr)
    api_key = os.getenv('IPINFO_API_KEY')
    
    if not api_key:
        print('ERROR: secrets not defined')
        return jsonify({'error': 'Internal Error'}), 500
    
    api_url = f'https://ipinfo.io/{ip_address}?token={api_key}'
    headers = {'Authorization': f'Bearer {api_key}'}
    response = requests.get(api_url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return jsonify(data)
    else:
        return jsonify({'error': 'Something Went Wrong'}), 500
