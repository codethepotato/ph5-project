from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Cat(db.Model, SerializerMixin):
    __tablename__ = 'cats'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    picture = db.Column(db.String)

    def __repr__(self):
        return f'<Cat {self.id}: {self.name}>'


class CatCult(db.Model, SerializerMixin):
    __tablename__ = 'cat_cults'
    
    id = db.Column(db.Integer, primary_key = True)
    motto = db.Column(db.String)

    cat_id = db.Column(db.Integer, db.ForeignKey('cats.id'))
    cult_id = db.Column(db.Integer, db.ForeignKey('cults.id'))

    def __repr__(self):
        return f'<CatCult {self.id}>'


class Cult(db.Model, SerializerMixin):
    __tablename__ = 'cults'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)


    def __repr__(self):
        return f'<Cult {self.id}: {self.name}>'


class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    description = db.Column(db.String)
    co_mingle = db.Column(db.Boolean)

    catcult_id = db.Column(db.Integer, db.ForeignKey('cat_cults.id'))

    def __repr__(self):
        return f'<Event {self.id}: {self.title}: {self.co_mingle}>'