from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from db import Winner
import json

with open('data/nobel_winners_cleaned.json','r') as f:
	nobel_winners = json.load(f)


engine = create_engine('sqlite:///data/nobel_winners.db',echo=True)




Session = sessionmaker(bind=engine)
session = Session()

#albert = Winner(**nobel_winners[0])	
#session.add(albert)
#session.new

winner_rows = [Winner(**w) for w in nobel_winners]
print(winner_rows[0])
session.add_all(winner_rows)
session.commit()