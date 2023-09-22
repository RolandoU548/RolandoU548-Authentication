"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route("/token", methods=["POST"])
def createToken():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test@gmail.com" or password != "test":
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/user', methods=['POST'])
def createUser():
    body = request.get_json()

    usuario = User.query.filter_by(email=body["email"]).first()
    if usuario:
        return jsonify({"message": "User " + body["email"] + " already exists"}), 400
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

@api.route('/user/<int:id>', methods=['GET'])
def getUser(id):
    user = User.query.get(id)
    if user:
        return jsonify(user.serialize()), 200
    raise APIException("User Not Found", status_code=404)

@api.route('/user/<int:id>', methods=['DELETE'])
def deleteUser(id):
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message" : user.email + " has been deleted"}), 200
    raise APIException("User Not Found", status_code=404)
