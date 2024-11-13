from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, migrate 
from routes.auth import auth_bp
from routes.events import events_bp

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)
migrate.init_app(app, db)

# ? ---------BLUEPRINTS--------------
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(events_bp, url_prefix='/api/events')

if __name__ == '__main__':
    app.run(debug=True)
