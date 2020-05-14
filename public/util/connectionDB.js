// Variables for all the menu-items

var connectionModel = require('../models/connection.js');
var mongoose = require('mongoose');

// details for each can be stored as a JSON
// Each object has 6 attributes:
/*
connectionID
itemName
typeOfFood
details
cookingTime
locations
imageUrl
*/

// var Pizza = {

//     connectionID: 1,
//     itemName: 'Veggie Pizza',
//     typeOfFood: "Vegan",
//     details: "This top-rated, much-loved easy veggie pizza is a favorite go-to for potlucks, tailgate parties, showers, girls’ weekends—basically wherever there's a hungry crowd. Plus it's a brilliant way to use up whatever veggies you have at the ready.",
//     cookingTime: "20mins",
//     locations: "University Terrace, Colville, North Tryon St, Mallard Creek" ,
//     imageurl: 'images/pizza.jpg'
// };

// var Naanbread = {
//     connectionID: 2,
//     itemName: 'Naan Bread',
//     typeOfFood: "Vegan",
//     details: "Naan is a leavened, oven-baked flatbread found in the cuisines mainly of Iran, India, Western Asia, South Asia, Central Asia, Myanmar and the Caribbean",
//     cookingTime: "20mins",
//     locations: "University Terrace, Colville, North Tryon St, Mallard Creek" ,
//     imageurl: 'images/naan-bread.jpg'
// };

// var Lassi = {
//     connectionID: 3,
//     itemName: 'Mango Lassi',
//     typeOfFood: "Vegan",
//     details: "Lassi is a popular traditional dahi-based drink that originated in the Indian subcontinent. Lassi is a blend of yoghurt, water, spices and sometimes fruit. Namkeen lassi is similar to doogh, while sweet and mango lassis are like milkshakes",
//     cookingTime: "20mins",
//     locations: "University Terrace, Colville, North Tryon St, Mallard Creek" ,
//     imageurl: 'images/mango-lassi.jpg'
// };

// var Meatpizza = {
//     connectionID: 4,
//     itemName: 'Meat Lover`s Pizza',
//     typeOfFood: "Meat",
//     details: "The perfect pizza crust topped with homemade pizza sauce, gooey cheese and tons of sausage, pepperoni and crumbled bacon! A meat lovers dream come true!",
//     cookingTime: "20mins",
//     locations:  "Concord, Colville, North Tryon St, Mallard Creek" ,
//     imageurl: 'images/Meat-Lovers-Pizza.jpg'
// };

// var Butterchicken = {
//     connectionID: 5,
//     itemName: 'Butter Chicken',
//     typeOfFood: "Meat",
//     details: "Butter Chicken simmers in a buttery tomato sauce and is punctuated by several special spices and herbs. Skip the Indian takeout and cook up your very own version of the popular dish!",
//     cookingTime: "20mins",
//     locations:  "Concord, Colville, North Tryon St, Mallard Creek" ,
//     imageurl: 'images/butter-chicken.jpg'
// };

// var JPChops = {
//     connectionID: 6,
//     itemName: 'Jamaican Pork Chops',
//     typeOfFood: "Meat",
//     details: "These sweet, spicy chops can be thrown together in minutes, but definitely don't taste like it. Serve it with a side of jasmine rice and you'll feel like you're on a tropical vacation",
//     cookingTime: "20mins",
//     locations:  "Concord, Colville, North Tryon St, Mallard Creek" ,
//     imageurl: 'images/jamaican-pork.jpg'
// };


/////////////////////////////////////
// Connection list:

// var allConnections = [Pizza,Naanbread,Lassi,Meatpizza,Butterchicken,JPChops];

/////////////////////////////////////


// var getConnection=function(connectionID)
// {

//   for(i=0;i<allConnections.length;i++){


//     if(allConnections[i].connectionID==connectionID){
//       let connection= connectionModel.connection(
//       allConnections[i].connectionID,
//       allConnections[i].itemName,
//       allConnections[i].typeOfFood,
//       allConnections[i].details,
//       allConnections[i].cookingTime,
//       allConnections[i].locations,
//       allConnections[i].imageurl);
//       return connection;
//     }
//   }
// };


var saveConnection = (userdata, cb) => {


    connectionModel.init();

    var connection = new connectionModel({
        itemName: userdata.item, 
        typeOfFood: userdata.typeoffood, 
        details: userdata.details,
        cookingTime: userdata.time, 
        imageurl: userdata.imageurl, 
        locations: userdata.locations 
    });

    connection.save((err, result) => {
        if (err) {
            console.error(err);
            cb(null);
        }
        else cb(result);
    });
};

//get all connections
var getConnections=function(cb)
{
  // console.log("getConnections:", "came here");
  connectionModel.find((err,result)=>{
    // console.log("result: ", result);
    cb(result);
  });
  
};

var connectionID_list = [];
function pushIDS(){
  for(s=0;s<allConnections.length;s++){
    connectionID_list.push(allConnections[s].connectionID);
  }
};
//get individual connection based on the connection ID 
var getConnection=function(connectionID,cb)
{

  connectionModel.find({connectionID:connectionID},(err,result)=>{
    // console.log("result: ", result);
    cb(result);
  });


};



// Export the functions
module.exports.getConnections=getConnections;
module.exports.getConnection=getConnection;
module.exports.saveConnection=saveConnection;