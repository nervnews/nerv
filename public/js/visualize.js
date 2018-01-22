var urlParams = new URLSearchParams(window.location.search);
var url = "visualize/" + urlParams.getAll("articleID");

fetchGET(url, function(err, data) {
  if (err) {
    alert("Could not get data requested. Please try search another key word!");
  } else {
    //This is the time to process the data using D3.js
    //By adding a console log, it's possible to see the data that is returned
    //from the backend after sentiment analysis processing.
    //The following is a proof of concept on how we render this data using D3.
    var data = data.splice(0, 15);

    var svg = d3.select("svg");
    var max_size = data[0].size;
    var min_size = data[data.length - 1].size;
    var width = window.innerWidth * 0.9;
    var height = window.innerHeight * 0.9;

    var radius = 4;
    var fontSize = 4;
    var scaleIt = width < height ? width : height;

    var radiusScale = d3
      .scaleSqrt()
      .domain([min_size, max_size])
      .range([scaleIt / 20, scaleIt / 5]);

    var drag = d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    var group = svg
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .call(drag);

    group
      .append("circle")
      .attr("cx", function(d) {
        return width / 2;
      })
      .attr("cy", function(d) {
        return height / 2;
      })
      .attr("r", function(d) {
        return 5;
      })
      .attr("fill", function(d) {
        return d.color_score;
      });

    group
      .append("text")
      .attr("text-anchor", function(d) {
        return "middle";
      })
      .attr("x", function(d, i) {
        return width / 2;
      })
      .attr("y", function(d, i) {
        return height / 2;
      })
      .text(function(d) {
        return d.word;
      });

    nodes_circles = d3.selectAll("circle");
    nodes_texts = d3.selectAll("text");

    //simulation is a collection of forces
    //that going to affect our circles
    var simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 1.7).strength(0.05))
      .force(
        "collide",
        d3.forceCollide(function(d) {
          return radiusScale(d.size);
        })
      );
    simulation.alphaDecay([0.001]);
    simulation.nodes(data).on("tick", ticked);
    function ticked() {
      radius += 2;
      fontSize += 1;
      nodes_circles
        .attr("cx", function(d) {
          //  console.log("d", d);
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        })
        .attr("r", function(d) {
          if (radius >= radiusScale(d.size)) return radiusScale(d.size);
          return radius;
        });
      nodes_texts
        .attr("x", function(d) {
          return d.x;
        })
        .attr("y", function(d) {
          return d.y;
        })
        .attr("style", function(d) {
          if (fontSize >= radiusScale(d.size) / 2)
            return `font-size: ${radiusScale(d.size) / 2}`;
          return `font-size: ${fontSize}px`;
        });
    }

    function dragstarted(d) {
      d3
        .select(this)
        .raise()
        .classed("active", true);
    }

    function dragged(d) {
      d3
        .select(this)
        .attr("cx", (d.x = d3.event.x))
        .attr("cy", (d.y = d3.event.y));
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }
  }
});
