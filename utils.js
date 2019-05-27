//Utils for serving mobile ads
var MobileAdsUtils = (function ()  {
    function MobileAdsUtils() {
    }

    var _awardSignature;

    var getCookie = MobileAdsUtils.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    };

    var setCookie = MobileAdsUtils.setCookie = function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else {
            var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    var getParam = MobileAdsUtils.getParam = function (paramName) {
        var result = undefined;
        var tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === paramName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    };

    var getEmplacement = function () {
        return getParam("emplacement");
    };

    var activatePixel = function (emplacement) {
        if (document.getElementById("stat_pixel")) {
            return;
        }
        var type = "display";
        if (typeof emplacement === 'undefined') {
            emplacement = getParam("emplacement");
            type = "click";
            if (typeof emplacement === 'undefined') return;
        }
        var img = document.createElement("img");
        img.src = "/pixel.png?emplacement=" + emplacement + "&type=" + type;
        img.width = 0;
        img.id = "stat_pixel";
        document.body.appendChild(img);
    };

    MobileAdsUtils.sendCompletionCallback = function (company_id, callback) {
        var emplacement = getEmplacement();
        if (typeof company_id === 'undefined') {
            company_id = getCookie(emplacement + ".company_id");
        }
        var token = getCookie(emplacement + ".token");
        if (!token || !company_id) {
            return;
        }
        var xmlhttp = new XMLHttpRequest();
        if (typeof callback !== 'function') {
            callback = function () {
                console.log('company ', company_id, ' finished', ' token: ', token);
            };
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback();
            }
        };
        xmlhttp.open("POST", "/complete_company.json", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({"token": token, "company_id": company_id}));
    };

    MobileAdsUtils.sendClick = function (emplacement) {
        var type = "click";
        if (typeof emplacement === 'undefined') {
            emplacement = getParam("emplacement");
        }
        var img = document.createElement("img");
        img.src = "/pixel.png?emplacement=" + emplacement + "&type=" + type;
        img.width = 0;
        img.id = "click_pixel";
        document.body.appendChild(img);
    };
    MobileAdsUtils.adDidAppear = function (emplacement) {
        activatePixel(emplacement);
    };

    MobileAdsUtils.sendUserData = function (userData) {
        var userDataRequestBody = MobileAdsUtils.userDataRequestBody(userData);
        if (!userDataRequestBody) {
            return;
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "/collect_user_data.json", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(userDataRequestBody);
    };

    MobileAdsUtils.receiveAward = function (callback) {
        var emplacement = getEmplacement();
        var token = getCookie(emplacement + ".token");
        var company_id = getCookie(emplacement + ".company_id");
        if (!token || !company_id) {
            console.log("ERROR: couldn't get token or company id from cookies");
            return false;
        }
        if (!_awardSignature) {
            _awardSignature = getCookie(emplacement + '.awardSignature');
        }
        if (!_awardSignature) {
            console.log("ERROR: award signature was not set by the app");
            return false;
        }
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    callback(xmlhttp.responseText, xmlhttp.status);
                } else {
                    callback("", xmlhttp.status);
                }
            }
        };
        var params = "token=" + token + "&company_id=" + company_id + "&signature=" + _awardSignature;
        xmlhttp.open("GET", "/receive_award.json?" + params, true);
        xmlhttp.send(null);
        return true;
    };

    MobileAdsUtils.userDataRequestBody = function (userData) {
        var emplacement = getEmplacement();
        var token = getCookie(emplacement + ".token");
        var company_id = getCookie(emplacement + ".company_id");
        if (!token || !company_id || !userData) {
            return false;
        }
        return JSON.stringify({"token": token, "company_id": company_id, "content": JSON.stringify(userData)});
    };

    MobileAdsUtils.extractParams = function () {
        var params = {};
        if (typeof MobileAdsUtils.URLScheme !== 'undefined') {
            params['URLScheme'] = MobileAdsUtils.URLScheme;
        }
        return params;
    };

    MobileAdsUtils.applyParams = function (params) {
        if (typeof params === 'undefined') {
            return;
        }
        var emplacement = getEmplacement();
        for (var name in params) {
            setCookie(emplacement + '.' + name, params[name], 1); //1day
        }

        if (params['canOpenURL']) {
            if (typeof MobileAdsUtils.canOpenURL == 'function') {
                MobileAdsUtils.canOpenURL();
            }
        } else {
            setCookie(emplacement + '.' + 'canOpenURL', false, 1); //1day
        }
        if (params['awardSignature']) {
            _awardSignature = params['awardSignature'];
        }
    };
    MobileAdsUtils.resourcesLoaded = function () {
        window.aviasales_ad_loaded = "loaded";
        if (window['HTMLOUT'] && typeof  window.HTMLOUT.getAviasalesAdLoaded == 'function') {
            window.HTMLOUT.getAviasalesAdLoaded('loaded');
        }
    };

    MobileAdsUtils.getDeviceName = function (short) {
        var width = ~~MobileAdsUtils.getParam('width');
        switch (true) {
            case width <= 320:
                return short ? '5' : 'iphone5';
            case width <= 375:
                return short ? '6' : 'iphone6';
            case width <= 414:
                return short ? '6+' : 'iphone6+';
            case width <= 768:
                return short ? 'i-p' : 'ipad-portrait';
            case width <= 1024:
                return short ? 'i-l' : 'ipad-landscape';
            default:
                return short ? 'un' : 'unknown';
        }
    };
    MobileAdsUtils.buildUrlParams = function (params) {
        var res = [];
        for (var i in params) {
            res.push([i, params[i]].join('='));
        }
        return res.join('&');
    };

    MobileAdsUtils.getOsName = function () {
        var isAndroid = /(android)/i.test(navigator.userAgent);
        var is_ios = /(iPad|iPhone|iPod)/i.test(navigator.userAgent);

        if (isAndroid) {
            return 'android';
        } else if (is_ios) {
            return 'ios';
        } else {
            return 'unknown-os';
        }
    };
    return MobileAdsUtils;

})();


document.addEventListener('DOMContentLoaded', function () {
    var body = document.getElementsByTagName('body'),
        device_name = MobileAdsUtils.getDeviceName(),
        os_name = MobileAdsUtils.getOsName();
    body[0].classList.add(device_name);
    body[0].classList.add(os_name);
});