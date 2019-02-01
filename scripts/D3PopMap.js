function update(townnum, g){
    var store
    console.log(townnum)
    d3.json('http://35.211.124.163/Circles/Towns/'+townnum).then(function(data) {
        store = data;
        
        $.each(store, function(d, obj){
            obj.LatLng = new L.LatLng(obj.lat, obj.lng);
        });
        
        var div = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "white")
        .style("opacity", "0")
        .style("padding", "0 10px")
        .style("z-index", "999");

        var circles=g.selectAll("circle")
        .data(store)
        .enter()
        .append("circle")
        .style("stroke", "black")  
        .style("opacity", .6) 
        .style("fill", function(d){
            return "rgb("+ 70000000/d.Population +"," + 10000000/d.Population+",0)"
        })
        .attr("r", function(d){
            return d.Population/6000
        })
        .attr("transform",function(d){
            return "translate("+
                map.latLngToLayerPoint(d.LatLng).x +","+
                map.latLngToLayerPoint(d.LatLng).y +")";
        })
        .attr("pointer-events","visible")
        .on("mouseover", function(d) {      
            div.transition()        
            .style("opacity", .9);      
                div .html(d.Town +", "+  d.County +", "+ d.Population)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
        })            
        .on("mouseout", function(d) { 
            div.transition()        
            .style("opacity", 0);
        });    
     });
}
