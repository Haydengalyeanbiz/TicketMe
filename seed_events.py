from app import app
from extensions import db
from models import Event
from datetime import datetime, timedelta
import random

# Define the categories and sample data
sample_events = [
    {
        "name": "Rock Legends Concert",
        "location": "City Arena",
        "price": 50.0,
        "category": "Concerts",
        "image_url": "https://example.com/images/rock_legends.jpg"
    },
    {
        "name": "Art Exhibition: Modern Masters",
        "location": "Downtown Art Gallery",
        "price": 25.0,
        "category": "Arts",
        "image_url": "https://example.com/images/art_exhibition.jpg"
    },
    {
        "name": "Championship Soccer Match",
        "location": "Stadium",
        "price": 60.0,
        "category": "Sports",
        "image_url": "https://example.com/images/soccer_match.jpg"
    },
    {
        "name": "Stand-Up Comedy Night",
        "location": "Comedy Club",
        "price": 30.0,
        "category": "Comedy",
        "image_url": "https://example.com/images/comedy_night.jpg"
    },
    {
        "name": "Family Fun Festival",
        "location": "Community Park",
        "price": 20.0,
        "category": "Family",
        "image_url": "https://example.com/images/family_fun.jpg"
    },
    {
        "name": "Jazz in the Park",
        "location": "Central Park",
        "price": 35.0,
        "category": "Concerts",
        "image_url": "https://example.com/images/jazz_park.jpg"
    },
    {
        "name": "Theatre Performance",
        "location": "City Theatre",
        "price": 40.0,
        "category": "Arts",
        "image_url": "https://example.com/images/theatre_performance.jpg"
    },
    {
        "name": "Basketball Game",
        "location": "Sports Arena",
        "price": 45.0,
        "category": "Sports",
        "image_url": "https://example.com/images/basketball_game.jpg"
    },
    {
        "name": "Improv Comedy Show",
        "location": "Comedy House",
        "price": 25.0,
        "category": "Comedy",
        "image_url": "https://example.com/images/improv_show.jpg"
    },
    {
        "name": "Zoo Family Day",
        "location": "City Zoo",
        "price": 15.0,
        "category": "Family",
        "image_url": "https://example.com/images/zoo_family_day.jpg"
    },
]

# Seed the events
def seed_events():
    with app.app_context():
        db.session.begin()  # Start transaction

        # Delete any existing events to avoid duplication
        db.session.query(Event).delete()

        # Add events
        for event_data in sample_events:
            event = Event(
                name=event_data["name"],
                description="Enjoy an amazing experience at our event!",
                date=datetime.utcnow() + timedelta(days=random.randint(1, 60)),  # Random future date
                location=event_data["location"],
                price=event_data["price"],
                available_tickets=100,  # Example ticket quantity
                user_id=1,  # Assuming user_id 1 as the owner for simplicity
                category=event_data["category"],
                image_url=event_data["image_url"]
            )
            db.session.add(event)

        db.session.commit()  # Commit transaction
        print("Events seeded successfully!")

# Run the seeder
if __name__ == "__main__":
    seed_events()
