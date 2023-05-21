
window.addEventListener( "load", makeRadial );
window.addEventListener( "load", makeCLHnetwork );

function makeTree() {
	d3.json("filesys.json").then(function(json){
		var nodes = d3.hierarchy(json,d=>d.kids);
		d3.tree().size([250,225])(nodes);

		var g = d3.select("#tree").append("g")
		.attr("transform","translate(25,25)");
		var lnkMkr = d3.linkVertical().x(d=>d.x).y(d=>d.y);
		g.selectAll("path").data(nodes.links()).enter()
		.append("path").attr("d",d=>lnkMkr(d))
		.attr("stroke","red").attr("fill","none");
		g.selectAll("circle").data(nodes.descendants()).enter()
		.append("circle").attr("r",5).attr("cx",d=>d.x).attr("cy",d=>d.y);

		nodes = d3.hierarchy(json,d=>d.kids).sort((a,b)=>b.height-a.height);
		d3.cluster().size([250,225])(nodes);
		 g = d3.select("#tree2").append("g")
		.attr("transform","translate(25,25)");
		 lnkMkr = d3.linkHorizontal().x(d=>d.x).y(d=>d.y);
		g.selectAll("path").data(nodes.links()).enter()
		.append("path").attr("d",d=>lnkMkr(d))
		.attr("stroke","red").attr("fill","none");
		g.selectAll("circle").data(nodes.descendants()).enter()
		.append("circle").attr("r",5).attr("cx",d=>d.x).attr("cy",d=>d.y);
		
	});
}

function makeRadial(){
	d3.json("filesys.json").then(function(json){
		var nodes = d3.cluster().size([2*Math.PI,125])(
		d3.hierarchy(json,d=>d.kids).sort((a,b)=>b.height-a.height));

		var g = d3.select("#radial").append("g").attr("transform","translate(150,150)");
		var h = function(r,phi){return r*Math.sin(phi)}
		var v = function(r,phi){return -r*Math.cos(phi)}

		g.selectAll("line").data(nodes.links()).enter()
		.append("line").attr("stroke","red")
		.attr("x1",d=>h(d.source.y,d.source.x))
		.attr("y1",d=>v(d.source.y,d.source.x))
		.attr("x2",d=>h(d.target.y,d.target.x))
		.attr("y2",d=>v(d.target.y,d.target.x));

		// g.selectAll("circle").data(nodes.descendants()).enter()
		// .append("circle").attr("r",5)
		// .attr("cx",d=>h(d.y,d.x))
		// .attr("cy",d=>v(d.y,d.x));

		g.selectAll("text").data(nodes.descendants()).enter()
		.append("text").text(d=>d.data.name)
		.attr("text-anchor","middle")
		.attr("x",d=>h(d.y,d.x))
		.attr("y",d=>v(d.y,d.x))
		.attr("dy",4)
		.attr("font-size",8);


	});
}

function makeNetwork(){
	d3.json("network.json").then(res=>{
		var svg=d3.select("#net")
		var scC=d3.scaleOrdinal(d3.schemePastel1)
		d3.shuffle(res.ps);d3.shuffle(res.ln);
		d3.forceSimulation(res.ps)
		.force("ct",d3.forceCenter(300,300))
		.force("ln",d3.forceLink(res.ln).distance(40).id(d=>d.id))
		.force("hc",d3.forceCollide(10))
		.force("many",d3.forceManyBody())
		.on("end",function(){
			svg.selectAll("line").data(res.ln).enter()
			.append("line").attr("stroke","black")
			.attr("x1",d=>d.source.x)
			.attr("y1",d=>d.source.y)
			.attr("x2",d=>d.target.x)
			.attr("y2",d=>d.target.y);

			svg.selectAll("circle").data(res.ps).enter()
			.append("circle")
			.attr("r",10).attr("fill",(d,i)=>scC(i))
			.attr("cx",d=>d.x).attr("cy",d=>d.y)

			svg.selectAll("text").data(res.ps).enter()
			.append("text")
			.attr("x",d=>d.x).attr("y",d=>d.y+4)
			.attr("text-anchor","middle")
			.attr("font-size",10)
			.text(d=>d.id);
		})


	});
}

function makeCLHnetwork(){
	d3.json("CLH_network.json").then(res=>{
		var svg=d3.select("#net")
		var scC=d3.scaleOrdinal(d3.schemePastel1)
		//let bBox = svg.node().getBBox();
		const width = +svg.attr('width');
		const height = +svg.attr('height');

		//var xScale =  d3.scaleLinear().domain([100, 180]).range([0, bBox.width]);
		//var yScale =  d3.scaleLinear().domain([0, 40]).range([0, bBox.height]);
		console.log(width);console.log(height);

		// const circles = svg.selectAll('circle')
		// 				.data(res.ps)
		// 				.enter()
		// 				.append('circle')
		// 				.attr('r',30);

		// d3.forceSimulation(res.ps)
		// .force("ct",d3.forceCenter(width/2,height/2))
		// .on("tick",()=>{
		// 	circles.attr('cx',d=>d.x).attr('cy',d=>d.y)
		// });

		d3.forceSimulation(res.ps)
			.force("ct",d3.forceCenter(width/2,height/2))
			.force("ln",d3.forceLink(res.ln).distance(400).id(d=>d.id))
			// .force("fx",d3.forceX(d=>xScale(d.lat)))
			// .force("fy",d3.forceY(d=>yScale(d.lng)))
			.on("tick",function(){
				svg.selectAll("line").data(res.ln).enter()
				.append("line").attr("stroke","black")
				.attr("x1",d=>d.source.x)
				.attr("y1",d=>d.source.y)
				.attr("x2",d=>d.target.x)
				.attr("y2",d=>d.target.y);

				svg.selectAll("circle").data(res.ps).enter()
				.append("circle")
				.attr("r",2).attr("fill","red")
				.attr("cx",d=>d.x).attr("cy",d=>d.y)
			})



	})
}