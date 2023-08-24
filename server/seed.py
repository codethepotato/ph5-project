from random import choice as rc, randrange

from app import app
from models import db, Cat, Cult, CatCult, Event

def initiateCats(cult, cats):
    for c in cats:
        db.session.add(CatCult(cat_id = c.id, cult_id = cult.id))


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Cat.query.delete()
        Cult.query.delete()
        CatCult.query.delete()
        Event.query.delete()
          
        c1 = Cat(name = 'Mr. Meow Meow', picture = '/Cat_cult_imgs/1.0.webp')
        c2 = Cat(name = 'Poh Tayto', picture = '/Cat_cult_imgs/emiley.webp')
        c3 = Cat(name = 'Purrsephone', picture = '/Cat_cult_imgs/alexis.png')
        c4 = Cat(name = 'Katze', picture = '/Cat_cult_imgs/amelia.jpg')
        c5 = Cat(name = 'Mittens', picture = '/Cat_cult_imgs/jeffery.jpg')
        c6 = Cat(name = 'Noir', picture = '/Cat_cult_imgs/jess.png')
        c7 = Cat(name = 'Dr. Motorcycle', picture = '/Cat_cult_imgs/jon.png')
        c8 = Cat(name = 'Ben', picture = '/Cat_cult_imgs/kevin.jpeg')
        c9 = Cat(name = 'Mr. Cats', picture = '/Cat_cult_imgs/marc.jpg')
        c10 = Cat(name = 'Spicer', picture = '/Cat_cult_imgs/mike-u.jpg')
        c11 = Cat(name = 'Sillia', picture = '/Cat_cult_imgs/sadaf.png')
        c12 = Cat(name = 'Purrito', picture = '/Cat_cult_imgs/sean.jpg')
        c13 = Cat(name = 'Catty McCatface', picture = '/Cat_cult_imgs/shanley.jpg')
        c14 = Cat(name = 'Caramel', picture = '/Cat_cult_imgs/syeda.jpg')
        c15 = Cat(name = 'Vivi', picture = '/Cat_cult_imgs/tj.png')
        c16 = Cat(name = 'Aurthur Fluffington', picture = '/Cat_cult_imgs/Will.jpg')
        c17 = Cat(name = 'Odie', picture = '/Cat_cult_imgs/yu.jpg')
        c18 = Cat(name = 'Purrple Haze', picture = '/Cat_cult_imgs/2.0.jpg')
        c19 = Cat(name = 'Lil Paw-pa', picture = '/Cat_cult_imgs/seb.jpg')
        c20 = Cat(name = 'Mr. Bean', picture = '/Cat_cult_imgs/robbie.png')
        c21 = Cat(name = 'Meowster Chief', picture = '/Cat_cult_imgs/captain.jpg')
        c22 = Cat(name = 'Apollo the Feline', picture = '/Cat_cult_imgs/zoe.jpeg')
        c23 = Cat(name = 'Timmy the Cat', picture = '/Cat_cult_imgs/nolan.png')
        c24 = Cat(name = 'Momo', picture = '/Cat_cult_imgs/Erica.jpg')
        c25 = Cat(name = 'Be-be', picture = '/Cat_cult_imgs/frankie.png')
        c26 = Cat(name = 'New Man Flewf', picture = '/Cat_cult_imgs/new-andrew.jpg')
        c27 = Cat(name = 'Harpaws', picture = '/Cat_cult_imgs/harjaws.png')
        c28 = Cat(name = 'Izzy', picture = '/Cat_cult_imgs/ainsley.jpg')
        c29 = Cat(name = 'Paw Paw', picture = '/Cat_cult_imgs/paul.jpg')
      
        cats = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25, c26, c27, c28, c29]
        db.session.add_all(cats)
        

        print('Seeding Cults...')
        cl1 = Cult(name = 'Back Alley', motto = 'Homies first and foremost!')
        cl2 = Cult(name = 'Shadow Paw', motto = 'What happens in the dark always comes to light.')
        cl3 = Cult(name = 'Bastet', motto = 'Cherishing feling qualities since they were Gods.')
        cl4 = Cult(name = 'Free Beans', motto = 'Never to be kenneled again!')
        cl5 = Cult(name = 'Dank Tails', motto = 'Nip all those problems in the bud!')
        cl6 = Cult(name = 'Illumicati', motto = 'We will once again rule.')
    
        cults = [cl1, cl2, cl3, cl4, cl5, cl6]
        db.session.add_all(cults)


        print('Seeding Events...')
        
        e1 = Event(
            title = 'Early Cat gets the bird!',
            description = '3am Morning Vocals to ancestors, proceeded by zoomies.',
            co_mingle = True,
            cult_id = 4)
        e2 = Event(
            title = 'Littering',
            description = 'A beautiful morning walk down to the local college. They have some freshly down lawn scaping, and added a new volleyball court. We shall head out at noon.', 
            co_mingle = True,
            cult_id = 5)
        e3 = Event(
            title = 'Shadow Paw Reaches All',
            description = 'Shadow Paw group members are meeting to discuss policy changes. All new initiates should meet for monthly reports.',
            co_mingle = False,
            cult_id = 2)
        e4 = Event(
            title = 'Squad Monthly Meet Up!',
            description = 'Back Alley cats it is time for our monthly meet! A chance to plan any extra group activities or discuss unexpected conflicts.',
            co_mingle = False,
            cult_id = 1)
        e5 = Event(
            title = 'Open Porch Meeting',
            description = 'Small neighborhood get together! This months chance to meet anyone who has moved in recently. Meet all the members and maybe this could be the group for you!',
            co_mingle = True,
            cult_id = 3)
    
        events = [e1, e2, e3, e4, e5]
        db.session.add_all(events)
        db.session.commit()

        print('Seeding CatCults...')
        
        # Back Alley
        cc1 = initiateCats(cl1, [c16, c18, c24, c27])
        # Bastet
        cc2 = initiateCats(cl2, [c3, c4, c6, c13, c22])
        # Shadow Paw
        cc3 = initiateCats(cl3, [c1, c2, c21])
        # Free Beans
        cc4 = initiateCats(cl4, [c5, c7, c12, c14, c19, c20, c29])
        # Dank Tails
        cc5 = initiateCats(cl5, [c10, c11, c25, c26])
        # Illumicati
        cc6 = initiateCats(cl6, [c8, c9, c15, c17, c23, c28])
        
        db.session.commit()


        print('Done seeding!')