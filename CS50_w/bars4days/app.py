import csv
from email.quoprimime import quote
import random
from cs50 import SQL
from flask import Flask, flash, render_template, request, session
from flask_session import Session
import requests

app = Flask(__name__)

@app.route("/")
def index():
  bars = []

  with open('bars.csv', 'r') as bars_file:
      bars_data = csv.reader(bars_file)

      next(bars_data)

      for line in bars_data:
          bars.append(f"{line[2]} - {line[1]}")
              
  bar = random.choice(bars)

  return render_template("index.html",bar=bar)

if __name__ == "__main__":
  app.run(host="0.0.0.0")