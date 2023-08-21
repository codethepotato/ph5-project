from flask import Flask
from models import Cat, Cult, CatCult, Event
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import os

from config import app, db, api


# Views go here!



@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Cats(Resource):
    def get(self):
        cats = [c.to_dict() for c in Cat.query.all()]
        return make_response(jsonify(cats), 200)
    
    def post(self):
        data = request.get_json()
        new_cat = Cat(name = data['name'], picture = data['picture'])
        db.session.add(new_cat)
        db.session.commit()
        return make_response(new_cat.to_dict(), 201)

api.add_resource(Cats, '/cats')


class Cults(Resource):
    def get(self):
        cults = [cl.to_dict() for cl in Cult.query.all()]
        return make_response(jsonify(cults), 200)
    
    def post(self):
        data = request.get_json()
        new_cult = Cult(name = data['name'], motto = data['motto'])
        db.session.add(new_cult)
        db.session.commit()
        return make_response(new_cult.to_dict(), 201)
    
api.add_resource(Cults, '/cults')


class Events(Resource):
    def get(self):
        events = [ev.to_dict() for ev in Event.query.all()]
        return make_response(jsonify(events), 200)
    
api.add_resource(Events, '/events')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

