from random import choice as rc, randrange

from app import app
from models import db, Cat, Cult, CatCult, Event


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Cat(name = '')