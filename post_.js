
var clientInfoJson = { 

    "company_id":"8888",
    "format":"simple",
    "dev_height":"1080",
    "dev_width":"1920"
    
}


//////////////////////////////////////////////////////////////////////////////////




var clientInfoUrl = "http://82.202.221.106/client_info";

function sendClientInfoJson(){

    var json = JSON.stringify(clientInfoJson);
    
    console.log(json);
    console.log(clientInfoJson);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", clientInfoUrl, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
	    var client_info = JSON.parse(xhr.responseText);
	    if (xhr.readyState == 4 && xhr.status == "200") {
		    console.table(client_info);
	    } else {
		    console.error(client_info);
	    }
    }
    xhr.send(json);
}

sendClientInfoJson();
