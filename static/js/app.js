
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {


// Drop down list data
drop_down_data=data.names


//Setting the Default Values for the charts and the demo info through calling the functions
barchart(940, data)
bubblechart(940, data)
dinfo(940,data)



console.log(data)



// Defining the Dropdownlist function for selecting the sample ids 
function Dropdownlist(){
  
  // Defining the "button" and selecting it on the website
  let button= d3.select("#selDataset");

  // Defining and intializing my samples names to go into the drop down list 
  let sampleNames = data.names;

  // using a for loop to insert the test ids into the drop down menu part of "select-options object"
  for (let i = 0; i < sampleNames.length; i++){
    button
      .append("option")
      .text(sampleNames[i])
      .property("value", sampleNames[i]);
  }
  }
  
  //calling my Dropdown list function to execute 
  Dropdownlist();




});


//Defining barchart function
function barchart(selectedvalue,data){  

//Filtering the data based on user input
let filter_data=data.samples.filter((sample_values) => sample_values.id==selectedvalue)

//testing the logic of filtered data to view it in console
console.log(filter_data[0]["sample_values"].slice(0,10).reverse())

// Create our bar graph trace 
let trace1 = {
  x: filter_data[0]["sample_values"].slice(0,10).reverse(),
  y: filter_data[0]["otu_ids"].slice(0,10).reverse().map(value => "OTU " + value),
  type: "bar",
  orientation: "h",
  text: filter_data[0]["otu_labels"].slice(0,10).reverse()
 
};

// The data array consists 
let data_plot = [trace1];


let layout = {

  title: "Bargraphs for the samples"
}


// Note that we omitted the layout object this time
// This will use default parameters for the layout
Plotly.newPlot("bar", data_plot, layout);
} 




function bubblechart(selectedvalue,data){
  let filter_data2=data.samples.filter((sample_values) => sample_values.id==selectedvalue)
      // Buble Chart inputs
 

    var trace2 = {
      x: filter_data2[0]["otu_ids"],
      y:filter_data2[0]["sample_values"] ,
      text:filter_data2[0]["otu_labels"] ,
      mode: 'markers',
      marker: {
        color: filter_data2[0]["otu_ids"],
        colorscale: 'Earth',
        size: filter_data2[0]["sample_values"]
      }
    };
    
    var data_buble = [trace2];
    
  
    Plotly.newPlot('bubble', data_buble);
  


}




function dinfo(selectedvalue,data){

  d3.select("#sample-metadata").selectAll("h5").remove();

  let filter_data2=data.metadata.filter((metadata) => metadata.id==selectedvalue)
  console.log(filter_data2)

  let key = 0;
  for (key in filter_data2[0]){

      d3.select("#sample-metadata").append("h5").text(key.concat(":","  ",filter_data2[0][key]));
  }



}


function optionChanged(selectedvalue){
  console.log(selectedvalue)

  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {


 barchart(selectedvalue, data)
 bubblechart(selectedvalue, data)
 dinfo(selectedvalue,data)
});





   
  }



