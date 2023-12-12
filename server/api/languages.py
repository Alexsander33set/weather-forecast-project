from flask import Blueprint, jsonify, request
import os
from dotenv import load_dotenv
import accepted_languages

load_dotenv()

languages_blueprint = Blueprint('languages', __name__)

@languages_blueprint.route('/api/languages', methods=['GET', 'POST'])
def get_languages():
    default_language = os.getenv('DEFAULT_LANGUAGE')
    
    
    
    return jsonify(accepted_languages, default_language)


