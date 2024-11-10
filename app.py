from flask import Flask
from config import Config
from extensions import db, migrate  
from models import User, Event, Ticket

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)  # Initialize db with app
migrate.init_app(app, db)  # Initialize migrate with app and db

if __name__ == '__main__':
    app.run(debug=True)
