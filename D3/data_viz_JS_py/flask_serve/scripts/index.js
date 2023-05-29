// d3.json('data/nobel_winners_cleaned.json').then(data=>{
// 	console.log("Dataset: ",data)
// 	makeChart(data)
// })

let data 
d3.json('data/nobel_winners_cleaned.json').then(_data=>{
	console.log("Dataset: ",_data)
	data = _data
	updateChart()
});

let selectedGroup='gender'

function makeChart(data){
	let cat_groups = d3.rollup(data, v=>v.length, d=>d.gender, d=>d.category)
	let male = cat_groups.get('male')
	let female = cat_groups.get('female')
	let categories = [...male.keys()].sort()

	let traceM = {
		y: categories,
		x: categories.map(c=>male.get(c)),
		name: 'male prize total',
		type: 'bar',
		orientation: 'h'
	}

	let traceF = {
		y: categories,
		x: categories.map(c=>female.get(c)),
		name: 'female prize total',
		type: 'bar',
		orientation: 'h'
	}

	let traces=[traceM,traceF]
	let layout = {barmode:'group',margin:{l:160}}
	Plotly.newPlot('gender-category',traces,layout)
}


function updateChart(){
	var traces=[
		{
		type: 'violin',
		x: data.map((d)=>d[selectedGroup]),
		y: data.map((d)=>d.award_age),
		points:'none',
		box:{
			visible:true
		},
		line: {
			color: 'green',
		},
		meanline:{
			visible: true
		},
		}
		];
	var layout = {
		title:"Age distributions of the Nobel prizewinners",
		yaxis:{
			zeroline:false
		},
		xaxis:{
			categoryorder:'category ascending'
		}
	}
	Plotly.newPlot("violin-group",traces,layout)
}

let availableGroups = ['gender','category']
availableGroups.forEach((g)=>{
	d3.select("#nobel-group")
	.append("option")
	.property("selected",g===selectedGroup)
	.attr("value",g)
	.text(g);
});

d3.select("#nobel-group").on("change",function (e){
	selectedGroup = d3.select(this).property("value");
	updateChart();
});


