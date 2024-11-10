import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'tontokeysecret')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///ticketme.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
