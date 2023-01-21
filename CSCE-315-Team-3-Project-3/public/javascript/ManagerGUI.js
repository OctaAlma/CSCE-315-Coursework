function makeMenuTable(data){
    htmlMenuTable = '<table> <tr id = "titleRow">';
    htmlMenuTable = htmlMenuTable + "<th>Menu ID</th>";
    htmlMenuTable = htmlMenuTable + "<th>Item Name</th>";
    htmlMenuTable = htmlMenuTable + "<th>Item Price</th>";
    //htmlMenuTable = htmlMenuTable + "<th>No. Ingredients</th>";
    htmlMenuTable = htmlMenuTable + "<th>Ingredients List</th>";
    htmlMenuTable = htmlMenuTable + "<th>Item Type</th>";
    htmlMenuTable = htmlMenuTable + "</tr>";

    for (let i = 0; i < data.result.length; i++){
        htmlMenuTable = htmlMenuTable + '<tr id = "menuItem">';
        htmlMenuTable = htmlMenuTable + '<td contentEditable="true">'+ data.result[i].menu_id + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].item_name + "</td>";
        htmlMenuTable = htmlMenuTable + '<td>$' + data.result[i].item_price + "</td>";
        //htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].num_ingredients + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + prettyArrayStr(data.result[i].ingredient_list) + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].type + "</td>";
        htmlMenuTable = htmlMenuTable + "</tr>";
    }
    htmlMenuTable = htmlMenuTable + "</table>";
    return htmlMenuTable;
}

function prettyArrayStr(array){
    arrayStr = "";
    for (let i = 0; i < array.length; i++){
        arrayStr = arrayStr + array[i];
        if (i != (array.length-1)){
            arrayStr = arrayStr + ", ";
        }
    }

    return arrayStr;
}

const viewMenuButton = document.getElementById("viewMenuButton");

viewMenuButton.addEventListener('click', function(e) {
    console.log('view menu was clicked');
  
    fetch('/getMenu', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
            .then(function(data) {
            // TODO: Modify HTML using the information received from the database
            content = document.getElementById("managerView");
            htmlMenuTable = makeMenuTable(data);
            content.innerHTML = htmlMenuTable;

            console.log(data.result);
        })
        .catch(function(error) {
            console.log(error);
    });
});



const addMenuItemButton = document.getElementById("addMenuItemButton");

addMenuItemButton.addEventListener('click', function(e) {
  console.log('add menu was clicked');
  const menuID = prompt("What is the menu ID?");
  if(menuID == null || menuID == ""){
    alert("add menu item was canceled");
  } else{
    const menuName = prompt("What is the name of the item?");
    if (menuName == null || menuName == ""){
        alert("add menu item was canceled");
    } else {
        const menuPrice = prompt("What is the new price");
        if (menuPrice == null || menuPrice == ""){
            alert("add menu item was canceled");
        } else{
            const menuIngredients = prompt("What ingredients do you want for the new item?");
            if (menuIngredients == null || menuIngredients == ""){
                alert("add menu item was canceled");
            } else {
                const menuIngNum = prompt("How many ingredients is in the new item");
                if (menuIngNum == null || menuIngNum == ""){
                    alert("add menu item was canceled");
                } else{
                    const menuType = prompt("What type of item is this?");
                    if (menuType == null || menuType == ""){
                        alert("add menu item was canceled");
                    } else{
                        const data = {menuID, menuName,menuPrice, menuIngredients, menuIngNum, menuType};
  
                        fetch('/addMenuItem', {
                              method: 'POST',
                              headers:{
                                  'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data)
                          })
                          .then(function(response) {
                            if(response.ok) {
                              console.log('Click was recorded');
                              return;
                            }
                            throw new Error('Request failed.');
                          })
                          .catch(function(error) {
                            console.log(error);
                          });
                      }
                    }

                }
            }

        }
    }
});


const  updateMenuItemButton = document.getElementById("updateMenuItemButton");

updateMenuItemButton.addEventListener('click', function(e) {
  console.log('update menu was clicked');
  const menuID = prompt("What is the menu ID?");
  if (menuID == null || menuID == ""){
    alert("menu update canceled");
  } else {
    if (confirm("Do you want to update the price?")){
        const menuPrice = prompt("What is the new price");
     
        const data = {menuID,menuPrice};
    
        fetch('/updateMenuPriceItem', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
          if(response.ok) {
            console.log('Click was recorded');
            return;
          }
          throw new Error('Request failed.');
        })
        .catch(function(error) {
          console.log(error);
        });
      } else {
        if (confirm("Do you want to update the name?")){
            const menuName = prompt("What is the new name?");

            const data2 = {menuID,menuName};

            fetch('/updateMenuNameItem', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data2)
            })
            .then(function(response) {
              if(response.ok) {
                console.log('Click was recorded');
                return;
              }
              throw new Error('Request failed.');
            })
            .catch(function(error) {
              console.log(error);
            });

        }
      }

  }
  
});


const  deleteMenuItemButton = document.getElementById("deleteMenuItemButton");

deleteMenuItemButton.addEventListener('click', function(e) {
  console.log('menu delete was clicked');
  const menuID = prompt("What is the menu ID?"); 
  
  const data = {menuID};

  fetch('/deleteMenuItem', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});


function makeInventoryTable(data){
    htmlMenuTable = '<table> <tr id = "titleRow">';
    htmlMenuTable = htmlMenuTable + "<th>Item ID</th>";
    htmlMenuTable = htmlMenuTable + "<th>Stock Price</th>";
    htmlMenuTable = htmlMenuTable + "<th>Units</th>";
    htmlMenuTable = htmlMenuTable + "<th>Quantity Remaining</th>";
    htmlMenuTable = htmlMenuTable + "<th>Serving Size</th>";
    htmlMenuTable = htmlMenuTable + "<th>Quantity Needed</th>";
    htmlMenuTable = htmlMenuTable + "</tr>";

    for (let i = 0; i < data.result.length; i++){
        htmlMenuTable = htmlMenuTable + '<tr id = "menuItem">';
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].itemid + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].stockprice + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].unit + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].quantity + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].serving_size + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].quantity_needed + "</td>";
        htmlMenuTable = htmlMenuTable + "</tr>";
    }
    htmlMenuTable = htmlMenuTable + "</table>";
    return htmlMenuTable;
}

const viewInventoryButton = document.getElementById("viewInventoryButton");

viewInventoryButton.addEventListener('click', function(e) {
    console.log('View Inventory was clicked');
  
    fetch('/getInv', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
            .then(function(data) {
            // TODO: Modify HTML using the information received from the database
            content = document.getElementById("managerView");
            htmlInvTable = makeInventoryTable(data);
            content.innerHTML = htmlInvTable;

            console.log(data.result);
        })
        .catch(function(error) {
            console.log(error);
    });
});

// inventory functions

const  orderInventoryButton = document.getElementById("orderInventoryButton");

orderInventoryButton.addEventListener('click', function(e) {
  console.log('order inventory was clicked');

  const inventoryIDPrompt = prompt("What is the inventory ID?", "i.e. bacon");
  const inventoryQuantity = prompt("what is the quantity to update to?");

  const inventoryID = inventoryIDPrompt.toLowerCase();

  const data = {inventoryID, inventoryQuantity};

  fetch('/orderInventoryItem', {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(function(response) {
  if(response.ok) {
    console.log('Click was recorded');
    return;
  }
  throw new Error('Request failed.');
})
.catch(function(error) {
  console.log(error);
});

});

const addInventoryItemButton = document.getElementById("addInventoryItemButton");

addInventoryItemButton.addEventListener('click', function(e) {
  console.log('add inventory was clicked');
  const inventoryID = prompt("What is the inventory ID?", "i.e. bacon");
  const inventoryStockprice = prompt("What is the stockprice of this item?");
  const inventoryUnits = prompt("What is the units of the item?");
  const inventoryQuantity = prompt("How much of the item do you have?");
  const inventoryServingSize = prompt("What is the serving size for this item?");
  const inventoryNeeded = prompt("How much of the item is needed?");
  
  const data = {inventoryID, inventoryStockprice, inventoryUnits, inventoryQuantity, inventoryServingSize, inventoryNeeded};

  fetch('/addInventoryItem', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});


// manager reports

// Helper function: 

/* 
IMPORTANT: dateSelectors has a value: 
    0 - NULL
    1 - Sales report
    2 - getPopMenuItems
*/
SALES = 1;
POPITEMS = 2;
EXCESS = 3;
RESTOCK = 4;

function getStartDate(){
    month = document.getElementById("startMonth");
    day = document.getElementById("startDay");
    year = document.getElementById("startYear");
    return year.options[year.selectedIndex].text + "-" + month.value + "-" + day.options[day.selectedIndex].text;
}

function getEndDate(){
    month = document.getElementById("endMonth");
    day = document.getElementById("endDay");
    year = document.getElementById("endYear");
    return year.options[year.selectedIndex].text + "-" + month.value + "-" + day.options[day.selectedIndex].text;
}

//Sales Report - Given a time window, display the sales by item from the order history

const createSalesReport = document.getElementById("salesReportButton");
createSalesReport.addEventListener('click', function(e) {
    console.log('Sales Report Button was clicked');
    document.getElementById("managerView").hidden = true;
    document.getElementById("dateSelectors").hidden = false;
    document.getElementById("dateSelectors").value = SALES;
});

const submitDates = document.getElementById("submitDates");
submitDates.addEventListener('click', function(e) {
    // IMPORTANT: Check if the "Submit Dates" button was clicked 
    // because the manager wanted a sales report:
    submitDateLogic();
});

function submitDateLogic(){
    startDate = getStartDate();
    endDate = getEndDate();

    document.getElementById("dateSelectors").hidden = true;
    document.getElementById("managerView").hidden = false;

    value = document.getElementById("dateSelectors").value;
    if (value == SALES){
        salesReportLogic(startDate, endDate);
    }else if (value == POPITEMS){
        popReportLogic(startDate, endDate);
    }else if (value == EXCESS){
        excessReportLogic(startDate, endDate);
    }else if (value == RESTOCK){
        restockReportLogic(startDate, endDate);
    }
}

function salesReport(data){
    salesTable = '<table><tbody><tr>';
    salesTable = salesTable + "<th>Item Name</th>";
    salesTable = salesTable + "<th>Sales</th>";
    salesTable = salesTable + "<th>Profit</th>";
    salesTable = salesTable + "</tr>"
    for (let i = 0; i < data.result.length; i++){
        salesTable = salesTable + '<tr id = "itemSold">';
        salesTable = salesTable + "<td>" + data.result[i].item_name + "</td>";
        salesTable = salesTable + "<td>" + data.result[i].sales + "</td>";
        salesTable = salesTable + "<td>" + data.result[i].profit + "</td>";
        salesTable = salesTable + "</tr>"
    }
    
    salesTable = salesTable + '</tbody></table>'
    return salesTable;
}

function salesReportLogic(startDate, endDate){
    // SALES QUERY:
    console.log(startDate + " to " + endDate);
    const data = {startDate, endDate};
  
    fetch('/getSalesRep', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        if (response.ok){return response.json();}
        throw new Error('Request failed.');
    }).then(function(data){
        console.log(data.result);
        
        htmlSalesRep = salesReport(data);
        console.log(htmlSalesRep);
        content = document.getElementById("managerView");
        content.innerHTML = htmlSalesRep;

    }).catch(function(error) {
        console.log(error);
    }
);}

async function getMenuItemArray(){
    arr = new Array();
    await fetch('/getMenu', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        }).then(function(data) {
            // TODO: Modify HTML using the information received from the database
            for (var i = 0; i < data.result.length; i++){
                arr.push(data.result[i]);
            }
        })
        .catch(function(error) {
            console.log(error);
        }
    );

    return arr;
}

async function getOrdersBetweenDates(startDate, endDate){
    orders = new Array();

    const data = {startDate, endDate};

    await fetch('/getOrdersBetweenDates', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    }).then(function(response) {
        if (response.ok){return response.json();}
        throw new Error('Request failed.');

    }).then(function(data){
        orders = new Array();
        for (let i = 0; i < data.result.length; i++){
            if (i == 0){
                orders.push(data.result[i]);
                items = Array();
                items.push(orders.at(orders.length-1).item);
                orders.at(orders.length-1).item = items;
            }else{
                if (orders.at(orders.length-1).order_id == data.result[i].order_id){
                    orders.at(orders.length-1).item.push(data.result[i].item);
                }else{
                    orders.push(data.result[i]);
                    items = Array();
                    items.push(orders.at(orders.length-1).item);
                    orders.at(orders.length-1).item = items;
                }
            }
        }

    }).catch(function(error) {
        console.log(error);
    });

    return orders;
}

/********************************   POPULAR MENU ITEMS   ************************************************/
const createPopMenuItemReport = document.getElementById("popMenuItemButton");
createPopMenuItemReport.addEventListener('click', function(e){
    document.getElementById("dateSelectors").value = POPITEMS;
    document.getElementById("dateSelectors").hidden = false;
    document.getElementById("managerView").hidden = true;
});

function removeDuplicateItems(order){
    uniqueItems = Array();
    for (let i = 0; i < order.item.length; i++){
        if (!uniqueItems.includes(order.item[i])){
            uniqueItems.push(order.item[i]);
        }
    }
    return uniqueItems;
}

function makeEmptyArr(orders, maxItem){
    arr = Array(maxItem);

    for (let i = 0; i < arr.length; i++){
        arr[i] = Array(maxItem).fill(0);
    }

    return updateHashMap(orders, arr, maxItem);
}

async function updateHashMap(orders, hashMap, maxItem){
    let x = 0;
    for (let i = 0; i < maxItem; i++){
        items = await removeDuplicateItems(orders[i]);

        if (items.length >= 2){
            x++;
        }

        for (let j = 0; j < items.length; j++){
        
            for (let k = j+1; k < items.length; k++){
                let menu_id1 = items[j];
                let menu_id2 = items[k];
                hashMap[menu_id1-1][menu_id2-1] = hashMap[menu_id1-1][menu_id2-1] + 1;
            }   
        }
    }
    return hashMap;
}

function displayPopItems(startDate, endDate, hashMap, menuItems){
    htmlStr = htmlStr + '<p>Popular Item Pairs from ' + startDate + ' to ' + endDate + '</p>';
    htmlStr = htmlStr + '<table><tr id = "titleRow">';
    htmlStr = htmlStr + '<th>Item 1</th><th><Item 2></th><th>Quantity Sold</th></tr>';

    for (let i = 0; i < hashMap.length; i++){
        
    }

    for (let i = 0; i < data.result.length; i++)
        htmlMenuTable = htmlMenuTable + '<tr id = "menuItem">';
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].itemid + "</td>";
        htmlMenuTable = htmlMenuTable + "<td>" + data.result[i].stockprice + "</td>";
}

async function popReportLogic(startDate, endDate){
    menuItems = await getMenuItemArray();
    orders = await getOrdersBetweenDates(startDate, endDate);

    maxItem = await menuItems.at(menuItems.length-1).menu_id;
    
    // Create an empty hashmap containing all the items:
    // The quantity sold for every "pair" of items can be found on the hashmap with indeces [menu_id1-1][menu_id2-1]
    hashMap = await makeEmptyArr(orders, maxItem);
    console.log(hashMap);

    displayPopItems(startDate, endDate, hashMap, menuItems);

}


// Restock Report - Display the list of items whose current inventory is less than the item's minimum amount to have around before needing to restock.
const createRestockReport = document.getElementById("restockReportButton");

// Excess Report - Given a timestamp, display the list of items that only sold less than 10% of their inventory between the timestamp and the current time, assuming no restocks have happened during the window.
const createExcessReport = document.getElementById("excessReportButton");

function googleTranslateElementInit(){
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}
