from flask import Blueprint, jsonify
from models import Event  
from extensions import db  

events_bp = Blueprint('events', __name__, url_prefix='/api/events')

# !--------------ALL EVENTS----------------
@events_bp.route('/', methods=['GET'])
def get_all_events():
    events = Event.query.all()
    events_list = [
        {
            "id": event.id,
            "name": event.name,
            "description": event.description,
            "date": event.date,
            "location": event.location,
            "price": event.price,
            "available_tickets": event.available_tickets,
            "category": event.category,
            "image_url": event.image_url
        }
        for event in events
    ]
    return jsonify(events_list), 200

# !--------------SINGLE EVENT BY ID----------------
@events_bp.route('/<int:id>', methods=['GET'])
def get_event_by_id(id):
    event = Event.query.get(id)
    if event is None:
        return jsonify({"error": "Event not found"}), 404

    event_data = {
        "id": event.id,
        "name": event.name,
        "description": event.description,
        "date": event.date,
        "location": event.location,
        "price": event.price,
        "available_tickets": event.available_tickets,
        "category": event.category,
        "image_url": event.image_url
    }
    return jsonify(event_data), 200