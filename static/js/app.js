
// Reading the Data using D3 library to pass it through json 
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {


// Drop down list data
drop_down_data=data.names


//Setting the Default Values for the charts and the demo info through calling the functions
barchart(940, data)
bubblechart(940, data)
dinfo(940,data)


// Printing the data in the console so i can inspect it and test my logic
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


//Defining barchart function #1
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

// Defining Layout for the samples
let layout = {

  title: "Bargraphs for the samples"
}

// Plotting bar chart 
Plotly.newPlot("bar", data_plot, layout);

} 



//Defining bubble chart function #2
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
    
    // Defning Layout for bubble chart
    let layout2 = {

      xaxis: {title: 'OTU IDs'}
    }
    


    var data_buble = [trace2];
    
  // Plotting the buble chart under "bubble" HTML id
    Plotly.newPlot('bubble', data_buble,layout2);
  


}



//Defining demo info function #3
function dinfo(selectedvalue,data){
  
  // Selecting the drop down button using its "id" in HTML and reseting it every time a new "sample_id" is selected
  d3.select("#sample-metadata").selectAll("h5").remove();

  // Filtering the metadata based on the secleted value from user
  let filter_data2=data.metadata.filter((metadata) => metadata.id==selectedvalue)
  // Testing the output in the console 
  console.log(filter_data2)

  // Running for loop to append the demo layer in HTML and print it based on selected id 
  let key = 0;
  for (key in filter_data2[0]){

      d3.select("#sample-metadata").append("h5").text(key.concat(":","  ",filter_data2[0][key]));
  }



}

// Calling existing "optionChanged" function from HTML class to pass selected value through all my 3 functions (bubble,bar and dinfo functions)
function optionChanged(selectedvalue){
  console.log(selectedvalue)

  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

// Passing user selected value from the drop down and the data through each function to populate the graphs dynamically 
 barchart(selectedvalue, data)
 bubblechart(selectedvalue, data)
 dinfo(selectedvalue,data)
});





   
  }



