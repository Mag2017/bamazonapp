var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  password: "root",
  database: "bamazon_db"
});
connection.connect(function(err) {
  if (err) throw err;
start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "Action",
      type: "list",
      message: "What is the id of the product you would like to buy?",
      choices: ["Find product by id",
                "2"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "POST") {
        postAuction();
      }
      else {
        bidAuction();
      }
    });
}
 // prompt for info about the item being bought
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item id fpr the product you will like to buy?"
      },
      {
        name: "StockQuantity",
        type: "input",
        message: "How many units of the product they would like to buy?",
      
              validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO auctions SET ?",
        {
            item_id:answer.id,
            product_name:answer.name,
            price:answer.price,
            
        },
        function(err) {
          if (err) throw err;
          console.log("Item already purchased!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function bidAuction() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for how many they'd like to buy
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What auction would you like to place a bid in?"
        },
        {
          name: "bid",
          type: "input",
          message: "How much would you like to bid?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }
