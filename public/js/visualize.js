/* eslint-disable */
var urlParams = new URLSearchParams(window.location.search);
var url = 'visualize/'+urlParams.getAll('articleID');
document.getElementById('back_button').addEventListener('click', function()  {
  window.history.back();
});
fetchGET(url, function(err, response){
  if (err) {
    alert('Could not get data requested. Please try search another key word!');
  } else {
    // This is the time to process the data using D3.js
    // By adding a console log, it's possible to see the data that is returned
    // from the backend after sentiment analysis processing.
    // The following is a proof of concept on how we render this data using D3.
    var data = response.data.splice(0, 15);
    document.getElementById('title').innerHTML = response.title;
    var svg = d3.select('svg');
    var maxSize = data[0].size;
    var minSize = data[data.length - 1].size;
    var width = window.innerWidth * 0.9;
    var height = window.innerHeight * 0.9;
    var radius = 4;
    var fontSize = 4;
    var t = d3.transition().duration(500);
    var scaleIt,
      forceX,
      forceY,
      radiusX,
      radiusY;
    if (width < height) {
      scaleIt = width;
      forceX = 1.97;
      forceY = 3;
      radiusX = 20;
      radiusY = 6;
    } else {
      scaleIt = height;
      forceX = 2;
      forceY = 2.5;
      radiusX = 30;
      radiusY = 10;
    }

    var radiusScale = d3
      .scaleSqrt()
      .domain([minSize, maxSize])
      .range([scaleIt / radiusX, scaleIt / radiusY]);

    var drag = d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    var group = svg
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr("id", function(d) {
        return d.word;
      })
      .call(drag)
      .on("dblclick", function(d) {
        var elementToRemove = d3.select(`#${d.word}`);

        elementToRemove
          .selectAll("circle")
          .style("fill", "grey")
          .transition(t)
          .attr("r", 1e-6)
          .remove();

        elementToRemove
          .selectAll("text")
          .transition(t)
          .style("font-size", `${1e-6}px`)
          .remove();

        d3.interval(function() {
          elementToRemove.remove();
        }, 500);

        data = data.filter(function(obj) {
          return obj.word !== d.word;
        });

        simulation.alphaTarget(0.01).restart();
        simulation.nodes(data).on("tick", ticked);
      });

    group
      .append('circle')
      .attr('cx',  width / 2)
      .attr('cy',  height / 2)
      .attr('r',  5)
      .attr('fill', function(d) {return d.colorScore});

    group
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x',  width / 2)
      .attr('y',  height / 2)
      .text(function(d) {return d.word});

    nodesCircles = d3.selectAll('circle');
    nodesTexts = d3.selectAll('text');

    // simulation is a collection of forces
    // that going to affect our circles
    var simulation = d3
      .forceSimulation()
      .force('x', d3.forceX(width / forceX).strength(0.05))
      .force('y', d3.forceY(height / forceY).strength(0.05))
      .force('collide', d3.forceCollide(function(d) {return radiusScale(d.size)}));
    simulation.alphaDecay([0.001]);
    simulation.nodes(data).on('tick', ticked);
    function ticked() {
      radius += 2;
      fontSize += 1;
      nodesCircles
        .attr('cx', function(d){return d.x})
        .attr('cy', function(d){return d.y})
        .attr('r', function(d){
          if (radius >= radiusScale(d.size)) return radiusScale(d.size);
          return radius;
        });
      nodesTexts
        .attr('x', function(d){return d.x})
        .attr('y', function(d){return d.y})
        .attr('style', function(d) {
          if (fontSize >= radiusScale(d.size) / 2) return ('font-size: '+radiusScale(d.size) / 2);
          return 'font-size: '+fontSize+'px';
        });
    }

    function dragstarted(d) {
      d3
        .select(this)
        .raise()
        .classed('active', true);
    }

    function dragged(d) {
      d3
        .select(this)
        .attr('cx', (d.x = d3.event.x))
        .attr('cy', (d.y = d3.event.y));
    }

    function dragended(d) {
      d3.select(this).classed('active', false);
    }
  }
});
