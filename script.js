

var overlay = document.getElementById('overlay');
var vid = document.getElementById('video');
var company_id = MobileAdsUtils.getParam('company_id');
var i = 0;
var load_flag = true;
var end_video_flag = false;

MobileAdsUtils.activatePixel('search_results')

if (overlay.addEventListener){
  overlay.addEventListener("click", play, false)
} else if (overlay.attachEvent){
  overlay.attachEvent("onclick", play)
}

function play() { 
  if (end_video_flag == false) {
    if (i == 0) {
      MobileAdsUtils.sendClick();
      i = 1;
      document.getElementById('hide__video_content').style.display = "block"
    }
    if (vid.paused){
      vid.play(); 
      overlay.className = "o";
      sendPlayVideo()
      document.getElementById('repeat__button_block').style.display = 'none'
    } else {
      vid.pause(); 
      //overlay.className = "";
      sendPauseVideo()
    }
  }
}


function getDocHeight(doc) {
  doc = doc || document;
  // stackoverflow.com/questions/1145850/
  var body = doc.body, html = doc.documentElement;
  var height = Math.max( body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight );
  return height;
}

function sendDocHeightMsg(e) {
  var ht = document.getElementById('video').offsetHeight;
  parent.postMessage( JSON.stringify( {'docHeight': ht} ), '*' );

  if (load_flag == true) {
    parent.postMessage( JSON.stringify( {
      'loadVideoAds': true,
      'specialData' : {
        'currentTime' : vid.currentTime,
        'companyId' : company_id
      }
    }), '*' );
    load_flag = false
  }
}

function sendPlayVideo(e) {
  parent.postMessage( JSON.stringify( 
    {
      'playVideo': true, 
      'specialData' : {
        'currentTime' : vid.currentTime,
        'companyId' : company_id
      }
    }), '*' );
    var ht = document.getElementById('video').offsetHeight;
    parent.postMessage( JSON.stringify( {'docHeight': ht} ), '*' ); //ставлю свои посты
}

function sendPauseVideo(e) {
  parent.postMessage( JSON.stringify( 
    {
      'pauseVideo': true, 
      'specialData' : {
        'currentTime' : vid.currentTime,
        'companyId' : company_id
      }
    }), '*' );
    var ht = document.getElementById('video').offsetHeight;
    parent.postMessage( JSON.stringify( {'docHeight': ht} ), '*' );
}

function handleMessagesIframe(e) {
  var data = JSON.parse( e.data )

  if (typeof data.resizeDoc !== 'undefined') {
    setTimeout( function() {
      sendDocHeightMsg()
    }, 300)
  }

  if (typeof data.pauseVideo !== 'undefined') {
    play()
  }
}

if ( window.addEventListener ) {
  window.addEventListener('load', sendDocHeightMsg, false);
  window.addEventListener('message', handleMessagesIframe, false);
}

vid.addEventListener('ended', function() {
  document.getElementById('repeat__button_block').style.display = 'block'
  parent.postMessage( JSON.stringify( 
    {
      'endVideo': true,
      'specialData' : {
        'currentTime' : vid.currentTime,
        'companyId' : company_id
      }
    }), '*' );
    end_video_flag = true
})

vid.addEventListener('timeupdate', function(e) {
  parent.postMessage( JSON.stringify( 
    {
      'updateVideoTime': true,
      'currentTime' : vid.currentTime
    }), '*' );
})

document.getElementById('repeat__button_block').addEventListener('click', function(e) {
  e.stopPropagation();
  end_video_flag = false
  vid.currentTime = 0;
  play()
  parent.postMessage( JSON.stringify( 
    {
      'repeatVideo': true,
      'specialData' : {
        'currentTime' : vid.currentTime,
        'companyId' : company_id
      }
    }), '*' );
});

document.getElementById('hide__video_content').addEventListener('click', function(e) {
  e.stopPropagation()
  parent.postMessage( JSON.stringify( 
    {
      'closeVideoAds': true,
      'specialData' : {
        'currentTime' : vid.currentTime,
        'companyId' : company_id
      }
    }), '*' );
})