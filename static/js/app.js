
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {


// Demo Data
demo_data=data.metadata[0]


// H.Bar Chart inputs

let labels= data.samples[0].otu_labels.slice(0,10).reverse()
let y_values=data.samples[0].otu_ids.slice(0,10).reverse();
let x_values=data.samples[0].sample_values.slice(0,10).reverse();

// Buble Chart inputs
let x_bubble=data.samples[0].otu_ids;
let y_bubble=data.samples[0].sample_values;
let bubble_labels=data.samples[0].otu_labels;


console.log(data)


// Create our first trace
let trace1 = {
    x: x_values,
    y: y_values.map(value => "OTU " + value),
    type: "bar",
    orientation: "h",
    text: labels
   
  };

  // The data array consists of both traces
  let data_plot = [trace1];
  

  let layout = {

    title: "Here is the title"
  }
  // Note that we omitted the layout object this time
  // This will use default parameters for the layout
  Plotly.newPlot("bar", data_plot, layout);
  
/////////////////////////////////////////////////////////////////////////////
  var trace2 = {
    x:x_bubble ,
    y:y_bubble ,
    text:bubble_labels ,
    mode: 'markers',
    marker: {
      color: x_bubble,
      colorscale: 'Earth',
      size: y_bubble
    }
  };
  
  var data_buble = [trace2];
  

  Plotly.newPlot('bubble', data_buble);

/////////////////////////////////////////////////

let key = 0;
for (key in demo_data){
    demo_data[key]
    d3.select("#sample-metadata").append("h5").text(key.concat(":","  ",demo_data[key]));
}

});


