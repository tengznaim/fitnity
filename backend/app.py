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

    elif search_type == "activities":
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


@app.route('/create-activity', methods=['GET', 'POST'])
def create_activity():
    if request.method == "GET":
        docs = db.collection("locations").get()

        location_results = []

        for doc in docs:
            temp = doc.to_dict()
            location_results.append({
                "locationName": temp["locationName"],
                "activities": temp["activities"]
            })

        docs = db.collection("activities").where(
            "userName", "==", "fiquee").get()

        user_activities_results = []

        for doc in docs:
            temp = doc.to_dict()
            user_activities_results.append(temp)

        return jsonify({"locations": location_results, "userActivities": user_activities_results})

    elif request.method == "POST":
        new_activity_data = request.json
        new_activity_data["time"] = new_activity_data["time"].replace(":", "")
        db.collection("activities").add(new_activity_data)

        return jsonify({"status": "successful"})


app.run(debug=True)
