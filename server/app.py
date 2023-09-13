from models import Cat, Cult, CatCult, Event
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
from flask_cors import CORS
import os
import ipdb
from config import app, db, api


# Views go here!



@app.route('/')
def index():
    return '<h1>Phase 5 Purr-Gatory</h1>'


@app.route('/login', methods = ['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    cat = Cat.query.filter_by(username = username).first()
    if not cat:
        return make_response({'error': 'Cat not found'}, 422)
    
    if not cat.authenticate(password):
        return make_response({'error': 'Incorrect password'}, 401)
    
    session['cat_id'] = cat.id
    # ipdb.set_trace()
    return make_response(cat.to_dict())


@app.route('/auth')
def auth():
    cat = Cat.query.filter(Cat.id == session.get('cat_id')).first()
    if cat:
        return make_response(cat.to_dict())
    else:
        return make_response({'error': 'No Cat is logged in!'}, 401)
    

@app.route('/logout', methods = ['DELETE'])
def logout():
    session['cat_id'] = None
    return make_response('', 204)


@app.before_request
def check_logged_in():
    if (request.endpoint in ['events', 'eventsbyid', 'logout'] and request.method != 'GET') \
            or request.endpoint == 'authorize':
        if not session.get('cat_id'):
            return make_response({'error': 'Unauthorized'}, 401)

class Cats(Resource):
    def get(self):
        cats = [c.to_dict() for c in Cat.query.all()]
        return make_response(jsonify(cats), 200)
    
    def post(self):
        data = request.get_json()
        new_cat = Cat(name = data['name'], picture = data['picture'], username = data['username'], password_hash = data['password'])

        if new_cat:
            try: 
                db.session.add(new_cat)

            except ValueError as v_error:
                return make_response({'error' : [str(v_error)]}, 422)

        db.session.commit()
        return make_response(new_cat.to_dict(), 201)

api.add_resource(Cats, '/cats')


class CatsById(Resource):
    def patch(self, id):
        cat = Cat.query.filter(Cat.id == id).first()
        data = request.get_json()

        for attr in data:
            setattr(cat, attr, data[attr])

        db.session.commit()

        response = make_response(cat.to_dict(), 200)
        return response 

api.add_resource(CatsById, '/cats/<int:id>')

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
    

api.add_resource(EventsById, '/events/<int:id>')


class CatCults(Resource):
    def get(self):
        catcults = [ctcl.to_dict() for ctcl in CatCult.query.all()]
        return make_response(jsonify(catcults), 200)

    def post(self):
        data = request.get_json()
        new_cultist = CatCult(cat_id = data['cat_id'], cult_id = data['cult_id'])
        db.session.add(new_cultist)
        db.session.commit()
        return make_response(new_cultist.to_dict(), 201)
    

api.add_resource(CatCults, '/catcults')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

