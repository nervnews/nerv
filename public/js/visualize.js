const urlParams = new URLSearchParams(window.location.search);
const url = `visualize/${urlParams.getAll('articleID')}`;

fetchGET(url, (err, data) => {
  if (err) {
    alert("Could not get data requested. Please try search another key word!");
  } else {
    // This is the time to process the data using D3.js
    // By adding a console log, it's possible to see the data that is returned
    // from the backend after sentiment analysis processing.
    // The following is a proof of concept on how we render this data using D3.
    var data = data.splice(0, 15);

    const svg = d3.select('svg');
    const maxSize = data[0].size;
    const minSize = data[data.length - 1].size;
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9;

    let radius = 4;
    let fontSize = 4;
    const scaleIt = width < height ? width : height;

    const radiusScale = d3
      .scaleSqrt()
      .domain([minSize, maxSize])
      .range([scaleIt / 20, scaleIt / 5]);

    const drag = d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    const group = svg
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .call(drag);

    group
      .append('circle')
      .attr('cx', d => width / 2)
      .attr('cy', d => height / 2)
      .attr('r', d => 5)
      .attr('fill', d => d.colorScore);

    group
      .append('text')
      .attr('text-anchor', d => 'middle')
      .attr('x', (d, i) => width / 2)
      .attr('y', (d, i) => height / 2)
      .text(d => d.word);

    nodesCircles = d3.selectAll('circle');
    nodesTexts = d3.selectAll('text');

    // simulation is a collection of forces
    // that going to affect our circles
    const simulation = d3
      .forceSimulation()
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 1.7).strength(0.05))
      .force('collide', d3.forceCollide(d => radiusScale(d.size)));
    simulation.alphaDecay([0.001]);
    simulation.nodes(data).on('tick', ticked);
    function ticked() {
      radius += 2;
      fontSize += 1;
      nodesCircles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', (d) => {
          if (radius >= radiusScale(d.size)) return radiusScale(d.size);
          return radius;
        });
      nodesTexts
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('style', (d) => {
          if (fontSize >= radiusScale(d.size) / 2) return `font-size: ${radiusScale(d.size) / 2}`;
          return `font-size: ${fontSize}px`;
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
