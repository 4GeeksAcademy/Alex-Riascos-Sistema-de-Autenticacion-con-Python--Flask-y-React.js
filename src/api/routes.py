"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint,current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity




api = Blueprint('api', __name__)



@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email).first()
    valid_password = current_app.bcrypt.check_password_hash(user.password, password)
    if user is None or not valid_password:
        return jsonify("Invalid email or password"), 401
    access_token = create_access_token(identity={"email": user.email, "id": user.id})
    return jsonify(token=access_token, user=user.serialize()), 200

@api.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user["email"]).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.serialize()), 200




@api.route('/register', methods=['POST'])
def register():
    request_body = request.get_json()
    if not request_body["email"] or not request_body["password"]:
        return jsonify("Email and password are required"), 400
    password_hash = current_app.bcrypt.generate_password_hash(request_body["password"]).decode('utf-8')
    user = User(email=request_body["email"], password=password_hash, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify("User created"), 200





