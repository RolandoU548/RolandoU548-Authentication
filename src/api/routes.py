"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/user', methods=['POST'])
def createUser():
    body = request.get_json()
    if "email" in body.keys() and body["email"] != "" and "password" in body.keys() and body["password"] != "":
        user = User(
            email=body.get("email".lower()),
            password=body.get("password".lower()),
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "message": user.email + " has been created"
        }), 201
    return jsonify({
        "message": "Attributes email and password are needed"
    }), 400

@api.route('/user', methods=['GET'])
def getUsers():
    users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(all_users), 200