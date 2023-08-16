from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Cat(db.Model, SerializerMixin):
    __tablename__ = 'cats'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    member = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Cat {self.id}: {self.name}>'


class CatCult(db.Model, SerializerMixin):
    __tablename__ = 'cat_cults'
    
    id = db.Column(db.Integer, primary_key = True)

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
    co_mingle = db.Column(db.Boolean)

    catcult_id = db.Column(db.Integer, db.ForeignKey('cat_cults.id'))

    def __repr__(self):
        return f'<Event {self.id}>'