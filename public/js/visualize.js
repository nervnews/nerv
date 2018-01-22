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
    data = [
      { fruit: "apple", freq: "32", color: "green" },
      { fruit: "pear", freq: "15", color: "blue" },
      { fruit: "banan", freq: "67", color: "red" },
      { fruit: "kiwi", freq: "34", color: "grey" },
      { fruit: "peach", freq: "22", color: "yellow" }
    ];

    var svg = d3.select("svg");

    var width = 640,
      height = 480;

    var radiusScale = d3
      .scaleSqrt()
      .domain([15, 67])
      .range([10, 80]);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return 0;
      })
      .attr("cy", function(d) {
        return 0;
      })
      .attr("r", function(d) {
        return radiusScale(d.freq);
      })
      .attr("fill", function(d) {
        return d.color;
      });

    nodes_circles = d3.selectAll("circle");

    //simulation is a collection of forces
    //that going to affect our circles
    var simulation = d3
      .forceSimulation()
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force(
        "collide",
        d3.forceCollide(function(d) {
          return radiusScale(d.freq);
        })
      );

    simulation.nodes(data).on("tick", ticked);

    function ticked() {
      nodes_circles
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
    }
  }
});
