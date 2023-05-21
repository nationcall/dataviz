// d3.select('#title').classed('fancy-title',true).text('My Bar Chart');

// var width = parseInt(d3.select('#nobel-bar').style('width'),10);

var nobelData = [
	{key:'United States',value:336},
	{key:'United Kingdom',value:98},
	{key:'Germany',value:79},
	{key:'France',value:60},
	{key:'Sweden',value:29},
	{key:'Switzerland',value:23},
	{key:'Japan',value:21},
	{key:'Russia',value:19},
	{key:'Netherlands',value:17},
	{key:'Austria',value:14},
]

var buildCrudeBarchart = function(){
	var chartHolder = d3.select("#nobel-bar");
	var margin = {top:20,right:20,bottom:30,left:40};
	var boundingRect = chartHolder.node().getBoundingClientRect();

	var width = boundingRect.width-margin.left-margin.right,
	height = boundingRect.height-margin.top-margin.bottom;

	var barWidth = width/nobelData.length;

	var svg = d3.select('#nobel-bar').append("svg").attr("width",width+margin.left+margin.right)
	.attr("height",height+margin.top+margin.bottom).append("g").classed('chart',true)
	.attr("transform","translate("+margin.left+","+margin.top+")");


	nobelData.forEach(function(d,i){
		svg.append('rect').classed('bar',true)
		.attr('height',d.value)
		.attr('width',barWidth)
		.attr('y',height-d.value)
		.attr('x',i*(barWidth));
	});

}

// let maxWinnders = d3.max(nobelData,function(d){return +d.value});
// let yScale = d3.scaleLinear().domain([0,maxWinnders]).range([height,0]);
// let xScale = d3.scaleBand().range([0,width]).domain(d3.range(nobelData.length)).padding(0.1);



//buildCrudeBarchart()

function updateBars(data){
	let svg = d3.select("#nobel-bars g");
	let bars = svg.selectAll(".bar").data(data);
	bars.join("rect")
		.classed("bar",true)
		.attr("height",10)
		.attr("width",d=>d.value)
		.attr("y",function(d,i){
			return i*12;
		});
}


updateBars(nobelData.slice(0,6))




