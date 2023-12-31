from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_bcrypt import bcrypt

from config import db, bcrypt

class Cat(db.Model, SerializerMixin):
    __tablename__ = 'cats'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    picture = db.Column(db.String)

    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    cat_cults = db.relationship('CatCult', back_populates = 'cat', cascade = 'all, delete-orphan')
    cults = association_proxy('cat_cults', 'cult')

    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, new_password):
        if (new_password, str) and 1 <= len(new_password) <= 15:
            secret = new_password.encode('utf-8')
            supersecret = bcrypt.generate_password_hash(secret)
            new_password_hash = supersecret.decode('utf-8')
            self._password_hash = new_password_hash
        else:
            raise ValueError('Password must be given between 1-15 characters!')
        
    def authenticate(self, test_string):
        return bcrypt.check_password_hash(self.password_hash, test_string.encode('utf-8'))

    @validates('name')
    def validates_name(self, key, new_name):
        if (new_name, str) and 1 <= len(new_name) <= 20:
            return new_name
        else:
            raise ValueError('Name must be given between 1-15 characters!')
        
    serialize_rules = ('-cat_cults', '-cults', )

    def __repr__(self):
        return f'<Cat {self.id}: {self.name} : {self.picture}>'


class CatCult(db.Model, SerializerMixin):
    __tablename__ = 'cat_cults'
    
    id = db.Column(db.Integer, primary_key = True)

    cat_id = db.Column(db.Integer, db.ForeignKey('cats.id'))
    cult_id = db.Column(db.Integer, db.ForeignKey('cults.id'))

    cat = db.relationship('Cat', back_populates = 'cat_cults')
    cult = db.relationship('Cult', back_populates = 'cat_cults')

    def __repr__(self):
        return f'<CatCult {self.id}>'


class Cult(db.Model, SerializerMixin):
    __tablename__ = 'cults'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    motto = db.Column(db.String)

    cat_cults = db.relationship('CatCult', back_populates = 'cult')
    cats = association_proxy('cat_cults', 'cat')

    serialize_rules = ('-cat_cults', '-cats')

    def __repr__(self):
        return f'<Cult {self.id}: {self.name}: {self.motto}>'


class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    description = db.Column(db.String)
    co_mingle = db.Column(db.Boolean)

    cult_id = db.Column(db.Integer, db.ForeignKey('cults.id'))

    # cat_cults = db.relationship('CatCult', back_populates = 'event')


    def __repr__(self):
        return f'<Event {self.id}: {self.title}:{self.description} : {self.co_mingle}>'