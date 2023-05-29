import nbviz from './nbviz_core.mjs'
import { initMenu } from './nbviz_menu.mjs'
import { initMap } from './nbviz_map.mjs'
import './nbviz_bar.mjs'
import './nbviz_details.mjs'
import './nbviz_time.mjs'

Promise.all([
  d3.json('static/data/world-110m.json'),
  d3.csv('static/data/world-country-names-nobel.csv'),
  d3.json('static/data/winning_country_data.json'),
  d3.json('static/data/nobel_winners_biopic.json'),
]).then(ready)

function ready([worldMap,countryNames,countryData,winnersData]){
	nbviz.data.countryData = countryData
	nbviz.data.winnersData = winnersData

	nbviz.makeFilterAndDimensions(winnersData)

	initMenu()
	initMap()
	nbviz.onDataChange()

}