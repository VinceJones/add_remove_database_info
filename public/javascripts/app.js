$(document).ready(function(){
    getData();
    getPostTemplate();

    $(".dataDisplay").on('click', ".removeData", function() {
       var dataId = $(this).data('id');
        console.log("Data Id of Delete Button: "+ dataId);
        for (var i = 0; i < databaseInfo.length; i++){
            if (dataId == databaseInfo[i]._id){
                console.log("Button ID to be removed: " + databaseInfo[i]._id);
                deleteData(dataId);
            }
        }
    });

    $(".dataDisplay").on('click', ".updateInfo", function() {
        var dataId = $(this).data('id');
        console.log("Data Id of Update Button: "+ dataId);
        for (var i = 0; i < databaseInfo.length; i++){
            if (dataId == databaseInfo[i]._id){
                console.log("Button ID to be update: " + databaseInfo[i]._id);
                updateInfoTemplate(dataId);
                //$("ul."+dataId).append(response);
            }
        }
    });

    $(".dataDisplay").on('click', '.updateBtn',function(){
        console.log("update button clicked");
        var dataId = $(this).data('id');
        //var name = ;
        //var score = ;
        //var date = ;

        var newObject = {
            _id: dataId,
            name: $("ul." + dataId).find('#name').val(),
            score: $("ul." + dataId).find('#score').val(),
            date_completed: $("ul." + dataId).find('#date_completed').val()
        };
        console.log("newObject built ", newObject);
        updateDatabaseInfo(newObject);
    });




});

var databaseInfo;

///////////////////////////////////////
// Update Info
//////////////////////////////////////
function updateDatabaseInfo(newObject) {
    $.ajax({
        type: "PUT",
        url: "/users/"+ newObject._id,
        datatype: "application/json",
        data: newObject,
        success: function(response) {
            console.log("Got you the update put");
            getData();
        },
        error: function() {
            console.log("No PUT for you!");
        },
        complete: function() {
            console.log("PUT function done");
        }
    });
}


///////////////////////////////////////
// Update Info Template
//////////////////////////////////////
function updateInfoTemplate(dataId) {
    $.ajax({
        type: "GET",
        url: "/updateTemplate",
        success: function(response) {
            console.log("Got you the update template");
            $('.dataDisplay').find("ul." + dataId).append(response);
            $("ul." + dataId).append("<button class='updateBtn' data-id=" + dataId + ">Update Info</button>");
            //$("ul." + dataId).find(".updateBtn").attr("data-id", dateId);
        },
        error: function() {
            console.log("No update template for you!");
        },
        complete: function() {
            console.log("Update template function done");
        }
    });
}


////////////////////////////////////////
// Get POST Template
////////////////////////////////////////
function getPostTemplate() {
    $.ajax({
        type: "GET",
        url: "/postTemplate",
        success: function(response) {
            console.log("Got you the post template");
            $(".postDataDisplay").append(response);
        },
        error: function() {
            console.log("No post template for you!");
        },
        complete: function() {
            console.log("Post template function done");
        }
    });
}



/////////////////////////////////////////
// This will Delete data from my DataBase
/////////////////////////////////////////
function deleteData(dataId) {
    $.ajax({
        type: "DELETE",
        url: "/users/" + dataId,
        success: function() {
            console.log("Data has been deleted for ", dataId);
            getData();
        },
        error: function() {
            console.log("Sucka, All the data is still there!");
        },
        complete: function() {
            console.log("Data delete complete function done");
        }
    })
}


///////////////////////////////////////
// This gets the data from my Database
//////////////////////////////////////
function getData() {
    $.ajax({
        type: "GET",
        url: '/users',
        success: function(response) {
            databaseInfo = response;
            getTemplate(response);
        },
        error: function() {
            console.log("Ya hoosier! GET ERROR!");
        },
        complete: function() {
            console.log("GET ajax complete");
        }
    });
}

////////////////////////////////////////////////
// This gets the template to display my data in
////////////////////////////////////////////////
function getTemplate(data) {
    $.ajax({
        type: "GET",
        url: '/template',
        success: function(response) {
            console.log('Got the Template');
            displayData(data, response);
        },
        error: function() {
            console.log("Ya hoosier! Template ERROR!");
        },
        complete: function() {
            console.log("Template ajax complete");
        }
    });
}

function displayData(data, template) {
    $(".dataDisplay").empty();
    for (var j = 0; j < data.length; j++) {
        var temp = $(template);
        var date = data[j].date_completed.slice(0,10);
        console.log("global " +  data[j]._id);

        temp.find('.name').append("Name: " + data[j].name);
        temp.find('.score').append("Score: " + data[j].score);
        temp.find('.date').append("Date: " + date);

        temp.find('.removeData').attr('data-id', data[j]._id);
        temp.find('.updateInfo').attr('data-id', data[j]._id);
        temp.find('ul').addClass(data[j]._id);

        $('.dataDisplay').append(temp);

    }
}

