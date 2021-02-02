const svgHeight = 400
const svgWidth = 1000

const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
    }

const chartHeight = svgHeight - margin.top - margin.bottom
const chartWidth = svgWidth - margin.left - margin.right

const svg = d3.select("body").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth )

const chartG = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

d3.csv("hours-of-tv-watched.csv").then(data => {
  const y = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.hours))])
    .range([chartHeight, 0])

  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, chartWidth])
    .padding(.05)

  const yAxis = d3.axisLeft(y)
  const xAxis = d3.axisBottom(x)

  chartG.append("g")
    .call(yAxis)

  chartG.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis)

  chartG.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.hours))
    .attr("height", d => chartHeight - y(d.hours))
    .attr("width", x.bandwidth())
    .classed("bar", true)

})



