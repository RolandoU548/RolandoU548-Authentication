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
    body = request.get_json()
    if "email" in body.keys() and body["email"] != "" and "password" in body.keys() and body["password"] != "":
        email = body.get("email", None).lower()
        password = body.get("password", None)
        user = User.query.filter_by(email = email).first()
        if user is None:
            return {'message': "user doesn't exist"}, 400
        if password != user.password:
            return jsonify({"msg": "Incorrect password"}), 403
        access_token = create_access_token(identity=email)
        return jsonify({"access_token":access_token})
    return jsonify ({"message" :"Parameters missing"})

@api.route('/user', methods=['POST'])
def createUser():
    body = request.get_json()
    if "email" in body.keys() and body["email"] != "" and "password" in body.keys() and body["password"] != "" and "name" in body.keys() and body["name"] != "":
        possible_user = User.query.filter_by(email=body["email"].lower()).first()
        if possible_user:
            return jsonify({"message": "User " + body["email"] + " already exists"}), 422
        name = body.get("name").capitalize()
        email = body.get("email").lower()
        print(email)
        user = User(
            name=name,
            email=email,
            password=body.get("password")
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({
            "message": "A user has been created",
            "name": user.name,
            "email": user.email
        }), 201
    return jsonify({
        "message": "Attributes name, email and password are needed"
    }), 400

@api.route('/users', methods=['GET'])
@jwt_required()
def getUsers():
    users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(all_users), 200

@api.route('/user', methods=['GET'])
@jwt_required()
def getUser():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify(user.serialize()), 200
    raise APIException("User Not Found", status_code=404)

@api.route('/user', methods=['DELETE'])
@jwt_required()
def deleteUser():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message" : user.email + " has been deleted"}), 200
    raise APIException("User Not Found", status_code=404)
