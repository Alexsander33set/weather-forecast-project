from flask import Blueprint, jsonify, request
import os
from dotenv import load_dotenv
import json

load_dotenv()

languages_blueprint = Blueprint('languages', __name__)

@languages_blueprint.route('/api/languages', methods=['GET', 'POST'])
def get_languages():
  data = open('accepted_languages.json', encoding='utf-8')
  data = json.load(data)
  print(data)

  if data:
    return jsonify(data)
  else:
    return jsonify({'error': 'Something Went Wrong'}), 500