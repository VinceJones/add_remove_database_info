$(document).ready(function(){
    $(".dataDisplay").append("Yo!");
    getData();

    $(".dataDisplay").on('click', ".removeData", function() {
       var dataId = $(this).data('id');
        console.log("Data Id of Button: "+ dataId);
        for (var i = 0; i < databaseInfo.length; i++){
            if (dataId == databaseInfo[i]._id){
                console.log("Button ID to be removed: " + databaseInfo[i]._id);
                deleteData(dataId);
            }
        }
    });
});

var databaseInfo;

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
        console.log("global " +  databaseInfo);

        temp.find('.name').append("Name: " + data[j].name);
        temp.find('.score').append("Score: " + data[j].score);
        temp.find('.date').append("Date: " + data[j].date_completed);

        temp.find('.removeData').attr('data-id', data[j]._id);
        $('.dataDisplay').append(temp);

    }
}

