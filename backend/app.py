from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore
from dotenv import load_dotenv
import os
import json

load_dotenv()

service_account_path = os.environ.get("FIREBASE_SERVICE_ACCOUNT")

if not firebase_admin._apps:
    cred_object = firebase_admin.credentials.Certificate(
        service_account_path)
    default_app = firebase_admin.initialize_app(cred_object)

app = Flask(__name__)
db = firestore.client()

# Change this to the proper URL of the frontend when ready for deployment
CORS(app, origins=["http://localhost:3000"])


@app.route("/")
def index():
    return jsonify({"message": "Hello World"})


@app.route("/search")
def search():
    request_params = dict(request.args)
    search_type, activity = request_params["searchType"], request_params["activity"]

    if search_type == "locations":
        docs = db.collection("locations").where(
            "activities", "array_contains", activity).get()

    elif search_type == "events":
        docs = db.collection("activities").where(
            "type", "==", activity).get()

    results = []

    for doc in docs:
        temp = doc.to_dict()

        if "locationCoordinate" in temp:
            latitude, longitude = temp["locationCoordinate"].latitude, temp["locationCoordinate"].longitude
            temp["locationCoordinate"] = {
                "latitude": latitude, "longitude": longitude}

        results.append(temp)

    return jsonify(results)


app.run(debug=True)
