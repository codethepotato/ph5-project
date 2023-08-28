from models import Cat, Cult, CatCult, Event
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
from flask_cors import CORS
import os

from config import app, db, api


# Views go here!



@app.route('/')
def index():
    return '<h1>Phase 5 Purr-Gatory</h1>'


@app.route('/login', methods = ['POST'])
def login():
    data = request.json
    username = data['name']
    password = data['password']

    cat = Cat.query.filter_by(name = username).first()
    if not cat:
        return make_response({'error': 'Cat not found'}, 404)
    
    if not cat.authenticate(password):
        return make_response({'error': 'Incorrect password'}, 401)
    
    session['cat_id'] = cat.id
    return make_response(cat.to_dict())


class Cats(Resource):
    def get(self):
        cats = [c.to_dict() for c in Cat.query.all()]
        return make_response(jsonify(cats), 200)
    
    def post(self):
        data = request.get_json()
        new_cat = Cat(name = data['name'], picture = data['picture'], username = data['username'], password_hash = data['password'])
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
    
    def post(self):
        data = request.get_json()
        new_event = Event(title = data['title'], description = data['description'], cult_id = data['cult_id'], co_mingle = data['co_mingle'])
        db.session.add(new_event)
        db.session.commit()
        return make_response(new_event.to_dict(), 201)

    
api.add_resource(Events, '/events')

class EventsById(Resource):
    def delete(self, id):
        evt = Event.query.filter_by(id = id).first()
        db.session.delete(evt)
        db.session.commit()
        return make_response({}, 204)
    
    def patch(self, id):
        attend = Event.query.filter_by(id = id).first()
        if not Event:
            return make_response({'Error' : 'Event not found'}, 404)
        data = request.json()
        for key in data:
            try:
                setattr(attend, key, data[key])
            except ValueError as v_error:
                return make_response({'Errors': [str(v_error)]}, 422)
        db.session.commit()
        return make_response(attend.to_dict())


api.add_resource(EventsById, '/events/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

