from sqlalchemy import Column,Integer,String,Enum,DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker



engine = create_engine('sqlite:///data/nobel_winners.db',echo=True)


Base = declarative_base()

class Winner(Base):
	__tablename__='winners'
	id = Column(Integer,primary_key=True)
	category = Column(String)
	country = Column(String)
	date_of_birth = Column(String)
	date_of_death = Column(String)
	gender = Column(Enum('male','female'))
	link = Column(String)
	name = Column(String)
	place_of_birth = Column(String)
	place_of_death = Column(String)
	text = Column(String)
	year = Column(Integer)
	award_age = Column(Integer)
	nationality = Column(String)

	def __repr__(self):
		return "<Winner(name='%s',category='%s',year='%s')>%(self.name,self.category,self.year)"


#Winner.__table__.drop(engine)
Base.metadata.create_all(engine)

