var sceneManager;

init();

function init () {

  window.onload = function() {

    loadScript('/js/SceneManager.js', function() {

      sceneManager = new SceneManager();

      loadScript('/js/MainSceneManager.js', function() {

        loadScript('/js/MemorialSceneManager.js', function() {

          loadScript('/js/Environment.js', function() {

            sceneManager.createScenes();

            loadScript('/js/sceneSubjects/Bubble.js', sceneManager.createSceneSubjects);
          });
        });
      });
    });

    bindCloseBtns();

    bindReturnBtn();

    animateLogo();
  }

  window.addEventListener('resize', onWindowResize, false);
}

function loadScript(uri, callBack) {

  var script = document.createElement('script');

  script.src = uri;

  script.onload = function() {

    callBack();
  };

  document.getElementsByTagName('body')[0].appendChild(script);
}

function bindCloseBtns() {

  var directions = document.getElementsByClassName("instructions");

  for( var i = 0;  i < directions.length; i ++) {

    directions[i].children[1].onclick = function() {

      fadeOut(this.parentElement);
    }
  }
}

function fadeOut(elem) {

  elem.style.opacity = '0';

  elem.style.visibility = 'hidden';
}

function bindReturnBtn() {

  var returnBtn = document.getElementById("return_btn");

  returnBtn.addEventListener("click", function (event) {

    sceneManager.resetScenes();
  });
}

function animateLogo() {

  var logoContainer = document.getElementById("logo-container");

  var logo = document.getElementById("logo").children[0];

  var lastXpos = 0;

  calcElemWidth(logo.parentElement, 20, 50, 0.05);

  var animationInterval = setInterval( function(){

    var percentage = (lastXpos / (46865 - 455)) * 100;

    logo.style.backgroundPosition = percentage + '% 0%';

    lastXpos = lastXpos + 455;

    if (lastXpos > 46865) {

      clearInterval(animationInterval);

      fadeOut(logoContainer);
    }

  }, 50);

  animationInterval;
}

function calcElemWidth(elem, minWidth, maxWidth, growthRate) {

  if (window.innerWidth <= 600) {

    elem.style.width = maxWidth + "%";

  } else if (window.innerWidth > 600 && window.innerWidth < 1200) {

    elem.style.width = (maxWidth - ((window.innerWidth - 600) * growthRate)) + "%";

  } else if (window.innerWidth >= 1200) {

    elem.style.width = minWidth + "%";
  }
}

function onWindowResize () {

  location.reload();
}

function update () {

  requestAnimationFrame(update);

  sceneManager.update();
}
