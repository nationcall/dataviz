from flask import Flask,request,abort
import dataset
import json
import datetime

app=Flask(__name__)
db = dataset.connect('sqlite:///data/nobel_winners.db')

@app.route('/api/winners')
def get_country_data():
	print('Request args:'+str(dict(request.args)))
	query_dict={}
	for key in ['country','category','year']:
		arg=request.args.get(key)
		if arg:
			query_dict[key]=arg 
	winners = list(db['winners'].find(**query_dict))
	if winners:
		return dumps(winners)
	abort(404)

class JSONDateTimeEncoder(json.JSONEncoder):
	def default(self,obj):
		if(isinstance(obj,(datetime.date,datetime.datetime))):
			return obj.isoformat()
		else:
			return json.JSONEncoder.default(self,obj)

def dumps(obj):
	return json.dumps(obj,cls=JSONDateTimeEncoder)

if __name__=='__main__':
	app.run(port=8000,debug=True)