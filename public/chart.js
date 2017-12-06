var svg = d3.select("svg"),
margin = {top: 20, right: 80, bottom: 30, left: 50},
width = svg.attr("width") - margin.left - margin.right,
height = svg.attr("height") - margin.top - margin.bottom,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear().range([0, width]),
y = d3.scaleLinear().range([height, 0]),
z = d3.scaleOrdinal(d3.schemeCategory10);

var line = d3.line()
.curve(d3.curveBasis)
.x(function(d) { return x(d.id); })
.y(function(d) { return y(d.timing); });

d3.tsv("wasm.tsv", type, function(error, data) {
if (error) throw error;

var languages = data.columns.slice(1).map(function(id) {
return {
  id: id,
  values: data.map(function(d) {
    return {id: +d.id, timing: d[id]*1000};
  })
};
});

console.log(d3.extent(data, function(d) { return +d.id; }));
x.domain(d3.extent(data, function(d) { return +d.id; }));

y.domain([
d3.min(languages, function(c) { return d3.min(c.values, function(d) { return d.timing; }); }),
d3.max(languages, function(c) { return d3.max(c.values, function(d) { return d.timing; }); }) / 2
]);

z.domain(languages.map(function(c) { return c.id; }));

g.append("g")
  .attr("class", "axis axis--y")
  .attr("transform", "translate(0," + height + ")")
  .attr("fill", "#000")
  .call(d3.axisBottom(x));

g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y))
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("fill", "#000")
  .text("Milliseconds");

var language = g.selectAll(".language")
.data(languages)
.enter().append("g")
  .attr("class", "language");

language.append("path")
  .attr("class", "line")
  .attr("d", function(d) { return line(d.values); })
  .style("stroke", function(d) { return z(d.id); });

language.append("text")
  .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
  .attr("transform", function(d) { return "translate(" + x(d.value.id) + "," + y(d.value.timing) + ")"; })
  .attr("x", 3)
  .attr("dy", "0.35em")
  .style("font", "10px sans-serif")
  .text(function(d) { return d.id; });
});

function type(d, _, columns) {
d.id = +d.id;
for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
return d;
}
