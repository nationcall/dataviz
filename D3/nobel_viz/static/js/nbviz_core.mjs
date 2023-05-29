let nbviz={};

nbviz.ALL_CATS = 'All Categories'
nbviz.TRANS_DURATION = 2000
nbviz.MAX_CENTROID_RADIUS = 30
nbviz.MIN_CENTROID_RADIUS = 2
nbviz.COLORS = {palegold:'#E6BE8A'}
nbviz.data = {}
nbviz.valuePerCapita = 0
nbviz.activeCountry = null
nbviz.activeCategory = nbviz.ALL_CATS

nbviz.CATEGORIES = [
	"Chemistry","Economics","Literature","Peace",
	"Physics","Physiology or Medicine"
]
nbviz.categoryFill = function(category){
	var i = nbviz.CATEGORIES.indexOf(category);
	return d3.schemeCategory10[i];
}

let nestDataByYear = function(entries){

}
nbviz.makeFilterAndDimensions = function(winnersData){
	nbviz.filter = crossfilter(winnersData);
	nbviz.countryDim = nbviz.filter.dimension(o=>o.country);
	nbviz.categoryDim = nbviz.filter.dimension(o=>o.category);
	nbviz.genderDim = nbviz.filter.dimension(o=>o.gender);

};
nbviz.filterByCountries = function(countryNames){

};
nbviz.filterByCategory = function(cat){

};
nbviz.getCountryData = function(){
	var countryGroups = nbviz.countryDim.group().all();
	var data = countryGroups.map(function(c){
		var cData = nbviz.data.countryData[c.key];
		var value = c.value;
		if(nbviz.valuePerCapita){
			value = value/cData.population;
		}
		return {
			key:c.key,
			value:value,
			code:cData.alpha3Code,
		}
	})
	.sort(function(a,b){
		return b.value-a.value;
	});

};
nbviz.callbacks = []

nbviz.onDataChange = function(){
	nbviz.callbacks.forEach((cb)=>cb())
}
export default nbviz;

