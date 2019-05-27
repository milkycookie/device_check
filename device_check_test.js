
//Raven.config('https://7dc5ed11535f495fa18bbfea97de795d@sentry.io/1275992').install();



// Array with Android device names and User Agents
var deviceArray = [

   //1080x1920
   ["Samsung Galaxy A5", "SM-A500"],
   ["Samsung Galaxy A5 (2017)", "sm-a520"],
   ["Samsung Galaxy A5 2016 Duos", "SM-A510"],
   ["Xiaomi Redmi Note 4", "HM NOTE 1LTE", "2013122", "Xiaomi_2013122", "Redmi Note 4", "HM NOTE 1LTETD", "Note 1LTE"],
   ["Xiaomi Redmi Premium Edition", "2013022", "2014501", "HM 1S"],
   ["Xiaomi Redmi Note 3", "Redmi Note 3"],
   ["Samsung Galaxy A7", "SM-A700"],
   ["Samsung Galaxy A7 (2016)", "sm-A710", "sm-a7009", "sm-a7108"],
   ["Samsung Galaxy A7 (2017)", "sm-a720"],
   ["Xiaomi Mi 5", "Mi 5"],
   ["Huawei Honor 8", "FRD-L09"],
   ["Xiaomi Mi 6", "MI 6"],
   ["Huawei Honor 8 Youth Edition", "FRD-L09", "DUK-L09", "PRA-AL00", "FRD-L19"],
   ["Samsung Galaxy S5", "SM-G900", "SM-G901", "SM-G906"],
   ["Xiaomi Mi 5s", "MI 5s"],
   ["Meizu M3 Note", "m3 note"],
   ["Huawei P10 Lite", "WAS-TL10"],
   ["Xiaomi Redmi 3", "Redmi 3"],
   ["Samsung Galaxy S4", "I9506", "GT-I9508", "GT-I9507", "GT-I9500", "GT-I9505", "GT-I9507", "GT-I9295", "SHV-E470", "GT-1313", "SCH-R970", "SGH-M919", "SPH-L720", "SCH-I545", "i545", "SC-04", "SGH-I337", "R970", "GT-I9502", "SGH-M919", "SHV-E300"],
   ["Huawei Honor 5C", "NEM-L21", "NEM-L22", "NEM-UL10"],
   ["LeEco Le 2 X527", "Le X527"],
   ["Huawei Honor 6X", "BLN-L24"],
   ["Huawei P9 Lite", "VNS-L31", "VNS-L23", "VNS-L21"],
   ["Samsung Galaxy Note 3", "SM-N9005", "SM-N900", "SM-N900", "SCL22", "SC-01"],
   ["Huawei P10 Premium Edition", "VTR-L09"],
   ["Meizu M5s Note", "M5S", "MZ-M5s Note"],
   ["Xiaomi Mi Max", "Mi Max"],
   ["Huawei Nova", "CAN-L11"],
   ["OnePlus 5", "A5000"],
   ["OnePlus 3", "A3000"],
   ["ASUS ZenFone 2", "ZE551ML"],
   ["Lenovo Vibe Shot", "Z90a40"],
   ["Meizu Pro 6", "MZ-PRO 6", "PRO 6"],
   ["Sony Xperia Z3", "D6653", "SOL26", "D6653", "D6603", "Z3"],
   ["Huawei Honor 5X", "KIW-TL00H"],
   ["Sony Xperia Z2", "SGP512"],
   ["Sony Xperia X", "F5121"],
   ["ZTE Blade V7", "Blade V7"],
   ["Lenovo Vibe S1", "S1a40"],

   //720x1280
   ["Samsung Galaxy A3 (2016)", "SM-A310"],
   ["Samsung Galaxy A3 (2017)", "SM-A320"],
   ["Xiaomi Redmi 4", "Redmi 4"],
   ["Samsung Galaxy J5", "SM-G500"],
   ["Samsung Galaxy J5 (2016)", "SM-G5108", "SM-G510"],
   ["Samsung J5 2017", "SM-G530"],
   ["Samsung J5 Pro", "SM-G530"],
   ["Xiaomi Redmi 3S", "Redmi 3S"],
   ["Samsung Galaxy J7 2015", "SM-J700"],
   ["Samsung Galaxy J7 2016", "SM-J710"],
   ["Samsung Galaxy J7 2017", "SM-S727"],
   ["Xiaomi Redmi 4A", "Redmi 4A"],
   ["Samsung Galaxy J3", "SM-J3109", "SM-J320", "SM-J326", "SM-J327", "SM-J330", "SM-J330"],
   ["Samsung Galaxy J5 Prime", "SM-G610"],
   ["Samsung Galaxy S III Neo", "SCH-I939", "GT-I9301", "GT-I9300"],
   ["Meizu M3S", "M3s"],
   ["Meizu M5s", "M5S"],
   ["ASUS ZenFone 2 Laser", "Z00ED", "Z00MD", "Z011DD", "Z011D"],
   ["ASUS Zenfone Pegasus 3", "X003", "X008"],
   ["Huawei Honor 4C Pro", "TIT-L01"],
   ["Huawei Honor 5A", "LYO-L21", "CAM-UL00"],
   ["Meizu Meilan U10", "U10"],
   ["LG X Power", "F750K"],
   ["Samsung Galaxy S5 Mini", "SM-G800", "G900 Mini"],
   ["Meizu M5", "MEIZU_M5", "M5"],
   ["Sony Xperia XA1", "G3121"],
   ["LG K10", "F670S", "M250", "K420", "k410"],
   ["Sony Xperia Z3 Compact", "D5803", "D5833"],
   ["Sony Xperia XA Dual", "F3116"],
   ["Sony Xperia E5", "F3311"],

   //1440_2560
   ["Samsung Galaxy S6", "SM-G920", "sm-g890", "sm-scv31"],
   ["Samsung Galaxy S7 Edge", "SM-G935"],
   ["Samsung Galaxy S7", "SM-G930", "SM-G891"],
   ["Samsung Galaxy Note 4", "SM-N910"],
   ["Samsung Galaxy Note 5", "SM-N920"],

   //1440_2960
   ["Samsung Galaxy S8", "SM-G892", "SM-G950"],
   ["Samsung Galaxy S8+ Duos", "SM-G955"],
   ["Samsung Galaxy Note 8", "GT-N5110", "GT-N5105", "GT-N5120", "N5100"],
   ["Samsung Galaxy S9", "SM-G960", "SM-G960"],

    //540x960
    ["Samsung Galaxy A3", "SM-A300"],
    ["Samsung Galaxy Grand Prime", "SM-G530", "SM-G930"],
    ["Samsung Galaxy Grand Prime Plus", "SM-G532"],

    //480x800
    ["Samsung Galaxy J1 (2016)", "SM-J120"],
    ["Samsung Galaxy J1", "SM-J100"],
    ["Samsung Galaxy J1 Ace", "SM-J110"]

];


// Parse URL for Client Info and write it into associated array
function buidArrayFromUrl() {
  
    var searchUrl = window.location.href;
    //var searchUrl = "http://mobile-ads-content.aviasales.ru/resources/MTC/index2.html?company_id=532&emplacement=search_results&search_id=55f6a27c-dc47-43cb-86de-5c9a4c345742&token=639e41faec6ab366f11714cde72a9326&format=simple&width=1080&height=1920";
    var getUrlInfo = searchUrl.split('?')[1];

    var associatedPairs = {};

    var pairs = getUrlInfo.split('&');

        for (var i = 0; i < pairs.length; i++) {
            var sep = pairs[i].indexOf('=');
            if (sep <= 0)
                continue;
            var key = decodeURIComponent(pairs[i].slice(0, sep));
            var value = decodeURIComponent(pairs[i].slice(sep + 1));
            associatedPairs[key] = value;
        }
return associatedPairs;
}

var clientInfoJson = buidArrayFromUrl();


function checkDateTime(){

    var d = new Date();
    
    var date = (d.getDate() < 10 ? '0' : '') + d.getDate();
    var month = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1);
    
    var year = d.getFullYear().toString();
    
    var hours = (d.getHours() < 10 ? '0' : '') + d.getHours();
    var minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    
    var fullDate = date + "-" + month + "-" + year;
    var fullTime =hours  + ":" + minutes;

    clientInfoJson.search_date = fullDate;
    clientInfoJson.search_time = fullTime;
    
}

checkDateTime();


clientInfoJson.banner_width = document.body.clientWidth;
clientInfoJson.banner_height = document.body.clientHeight;



// Get the necessary User Agent parentheses with device code
function getFirstParentheses() {
    
    var firstParentheses = new RegExp(/\(([^)]+)\)/);
    var result = firstParentheses.exec(navigator.userAgent);

return result[1];
}


var shortUserAgent = getFirstParentheses();
clientInfoJson.user_agent = shortUserAgent;
var shortUserAgentArray = shortUserAgent.split(";");


function checkOS(){

    var apple = "iPhone";
    var google = "Linux";

    if (shortUserAgentArray[0].includes(apple)) {
    
        clientInfoJson.os = "iOS";
        shortUserAgentArray.shift();
        getIosVersion();

    }     

    if (shortUserAgentArray[0].includes(google)) {

        clientInfoJson.os = "Android";
        shortUserAgentArray.shift();
        getAndroidVersion();

    }     
    
}

checkOS();


function getAndroidVersion(){

    var andr = "Android";
    var osVersion = "";

    for (var i=0;  i < shortUserAgentArray.length; i++) {

        if (shortUserAgentArray[i].includes(andr)) {

            osVersion = shortUserAgentArray[i].replace(andr, "");
            osVersion = osVersion.replace(new RegExp(" ", 'g'), "");
            clientInfoJson.os_version = osVersion;

        }     
    }    
}


function getIosVersion(){

    var iph = "iPhone";
    var iphStart = "CPU iPhone OS";
    var iphEnd = "like Mac OS X";  
    var osVersion = "";

    for (var i=0;  i < shortUserAgentArray.length; i++) {

        if (shortUserAgentArray[i].includes(iph)) {

            osVersion = shortUserAgentArray[i].replace(iphStart, "");
            osVersion = osVersion.replace(iphEnd, "");
            osVersion = osVersion.replace(new RegExp(" ", 'g'), "");
            osVersion = osVersion.replace(new RegExp("_", 'g'), ".");
            clientInfoJson.os_version = osVersion;

        }     
   
    }    

}


// Compare device User Agent with our base and get device name
function androidCheck() {

    var devName = "Android_" + clientInfoJson.dev_width;
    shortUserAgent = shortUserAgent.toUpperCase();
    
    firstloop:
    for (var i=0;  i < deviceArray.length; i++) {
        secondloop:
        for (var j=0; j < deviceArray[i].length; j++) {
            
            var currentArrayAgent = deviceArray[i][j].toUpperCase();

            if (shortUserAgent.includes(currentArrayAgent)) {
                devName = deviceArray[i][0];
                break firstloop;
            }          
            
        }   
    }    
console.log(devName);
return devName;
}


function iphoneCheck(){

    var devName = "";
    var iphWidth = clientInfoJson.dev_width;
    var iphHeight = clientInfoJson.dev_height;

    if (iphWidth == "320" && iphHeight == "480"){
        devName = "iPhone 4, 4s";
    }

    if (iphWidth == "320" && iphHeight == "568"){
        devName = "iPhone 5, 5s, 5c, SE";
    }

    if (iphWidth == "375" && iphHeight == "667"){
        devName = "iPhone 6, 6s, 7, 8";
    }

    if (iphWidth == "414" && iphHeight == "736"){
        devName = "iPhone 6+, 6s+, 7+, 8+";
    }

    if (iphWidth == "375" && iphHeight == "812"){
        devName = "iPhone X";
    }

    if (iphWidth > "414" && iphHeight > "736"){
        devName = "iPad";
    }

return devName;
}



// Writing device name to clientInfoJson JSON
function getDeviceName() {

    var platformOS = clientInfoJson.os;

    if (platformOS == "iOS") {
        clientInfoJson.device_name = iphoneCheck();
    } else if (platformOS == "Android") {
        clientInfoJson.device_name = androidCheck();
    } 
}

getDeviceName();





