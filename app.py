from flask import Flask, render_template, request, redirect, url_for, session
import requests

app = Flask(__name__)
app.secret_key = "your_secret_key"
GEMINI_API_KEY = "API"


@app.route("/")
def home():
    return render_template("index.html")  # Ensure you have 'index.html' in the templates folder


@app.route("/explore")
def explore():
    username = session.get("username")
    return render_template("explore.html", username=username)


@app.route("/profile", methods=["GET", "POST"])
def profile():
    if request.method == "POST":
        session["username"] = request.form["name"]
        return redirect(url_for("explore"))
    return render_template("profile.html")


@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect(url_for("explore"))


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/overview")
def overview():
    return render_template("overview.html")


@app.route("/analytics")
def analytics():
    return render_template("analytics.html")


@app.route("/inbox")
def inbox():
    return render_template("inbox.html")


@app.route("/sent")
def sent():
    return render_template("sent.html")


@app.route("/drafts")
def drafts():
    return render_template("drafts.html")


@app.route('/privacy')
def privacy():
    return render_template('privacy.html')


@app.route('/help')
def help_page():
    return render_template('help.html')


def get_trip_overview(destination, days, budget, travel_time, rest_time):
    url = 'https://api.google.com/gemini/v1/generate'
    headers = {
        'Authorization': f'Bearer {GEMINI_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        'prompt': f'Generate a detailed trip overview for a {days}-day trip to {destination} with a budget of {budget} INR, including travel time of {travel_time} hours and rest time of {rest_time} hours.',
        'max_tokens': 500
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json().get('text', 'No overview available.')
    else:
        return 'Error: Unable to fetch trip overview.'


@app.route('/plan_trip', methods=['POST'])
def plan_trip():
    destination = request.form['destination']
    days = request.form['days']
    budget = request.form['budget']
    travel_time = request.form['travelTime']
    rest_time = request.form['restTime']

    trip_overview = get_trip_overview(destination, days, budget, travel_time, rest_time)

    return render_template('trip_overview.html', overview=trip_overview)


if __name__ == "__main__":
    app.run(debug=True)
