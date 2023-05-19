import dataset
db = dataset.connect('sqlite:///data/nobel_winners.db')
wtable=db['winners']
winners=wtable.find()
winners=list(winners)
print(winners)