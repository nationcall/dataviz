
window.addEventListener( "load", makeRadial );
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