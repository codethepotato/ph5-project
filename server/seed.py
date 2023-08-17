from random import choice as rc, randrange

from app import app
from models import db, Cat, Cult, CatCult, Event


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        cats = [    
            Cat(name = 'Mr. Meow Meow'),
            Cat(name = 'Poh Tayto'),
            Cat(name = 'Purrsephone'),
            Cat(name = 'Katze'),
            Cat(name = 'Mittens'),
            Cat(name = 'Noir'),
            Cat(name = 'Dr. Motorcycle'),
            Cat(name = 'Ben'),
            Cat(name = 'Mr. Cats'),
            Cat(name = ''),
            Cat(name = ''),
            Cat(name = 'Purrito'),
            Cat(name = ''),
            Cat(name = 'Caramel'),
            Cat(name = 'Vivi'),
            Cat(name = 'Aurther Fluffington'),
            Cat(name = ''),
            Cat(name = 'Purrple Haze'),
            Cat(name = 'Lil Paw-pa'),
            Cat(name = ''),
            Cat(name = 'Meowster Chief'),
            Cat(name = 'Apollo the Feline'),
            Cat(name = 'Timmy the Cat'),
            Cat(name = 'Momo'),
            Cat(name = ''),
            Cat(name = ''),
            Cat(name = 'Harpaws'),
            Cat(name = 'Izzy'),
            Cat(name = 'Paw Paw'),
        ]

        db.session.add_all(cats)

        print('Seeding Cults...')
        cults = [
            Cult(name = 'Back Alley'),
            Cult(name = 'Shadow Paw'),
            Cult(name = 'Bastet'),
            Cult(name = 'Free Beans'),
            Cult(name = 'Dank Tails'),
            Cult(name = 'Illumicati')
        ]

        db.session.add_all(cults)


        print('Seeding Events...')
        events = [
            Event(title = 'Early Cat gets the bird!'),
            Event(title = 'Littering'),
        ]

        db.session.add_all(events)
        db.session.commit()

        print('Seeding CatCults...')
        catcults = []
        for cult in cults:
            cat = rc(cats)
            catcults.append(
                CatCult(cat_id = cat.id, cult_id = cult.id))
        
            
        db.session.add_all(catcults)
        db.session.commit()


        print('Done seeding!')