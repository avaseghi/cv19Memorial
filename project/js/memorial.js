var testimonyInfo_container = document.getElementById("testimony__info");
var personalInfo_container = testimonyInfo_container.children[0];
var testimonyType_container = testimonyInfo_container.children[1];
var imageContainer = document.getElementById("testimony_img");
var testimonyContainer = document.getElementById("testimony-wrapper");

var testimonyElements;
var angleIncrement;
var elementDegrees;

function createMemorialContent(content) {
  testimonyElements = [];
  elementDegrees = [];

  removeChildren([personalInfo_container, testimonyType_container, imageContainer, testimonyContainer]);

  for (var i = 0; i < content[0].length; i ++) {
    createTestimonyTxtElem(content[0][i], "span", personalInfo_container, null);
  }

  createTestimonyTxtElem(content[1], "p", testimonyType_container, testimonyInfo_container);

  if(content[2]){
    var portraitElem = document.createElement("div");
    portraitElem.style.backgroundImage = "url('portraits/" + content[2] + "')";
    portraitElem.className = "testimony_portrait";

    imageContainer.appendChild(portraitElem);
    testimonyElements.push(imageContainer);
  }

  if (content[3]) {
    createTestimonyText(content[3].split(' '));
  }

  console.log(testimonyElements);

  testimonyElements[0].style.opacity = '1';
  for (var i = 1; i < testimonyElements.length; i ++) {
    testimonyElements[i].style.opacity = '0';
    console.log("The opacity of testimony " + (i + 1) + " is now " + testimonyElements[i].style.opacity);
  }

  angleIncrement = 360/(testimonyElements.length );

  for(var i = 0; i < testimonyElements.length; i ++) {

    console.log("If degree is between " + i * angleIncrement + " and " + ((i + 1) * angleIncrement) + ", item " + (i + 1) + " will be shown.");

    elementDegrees.push([i * angleIncrement, (i + 1) * angleIncrement]);
  }
}

function createTestimonyTxtElem(content, elemType, container, testimonyElemContainer) {
  if (content) {
    var dom_el = document.createElement(elemType);
    var txt = document.createTextNode(content);

    dom_el.appendChild(txt);
    container.appendChild(dom_el);

    if(testimonyElemContainer) {
      testimonyElements.push(testimonyElemContainer);
    }
  }
}

function removeChildren(parents) {
  for(var i = 0; i < parents.length; i ++) {
    var child = parents[i].lastElementChild;
    while (child) {
      parents[i].removeChild(child);
      child = parents[i].lastElementChild;
    }
  }
}

function createTestimonyText(testimonyContent) {
  var elem = createTestimonyParagraph();

  for (var i = 0; i < testimonyContent.length; i++) {
    if (isOverflown(elem)) {
      elem.parentNode.parentNode.removeChild(elem.parentNode);
      testimonyElements.pop();
      var newContent = testimonyContent.slice(0, i - 1);
      var modifiedArray = testimonyContent.slice(i - 1);

      createTestimonyText(newContent);
      createTestimonyText(modifiedArray);
      break;
    } else {
      elem.innerHTML += (testimonyContent[i] + ' ');
    }
  }
}

function isOverflown(element) {
  return element.scrollHeight > element.clientHeight;
}

function createTestimonyParagraph() {
  var blockquoteElem = document.createElement("blockquote");
  blockquoteElem.className = "text";
  var testimony_txtContainer = document.createElement("p");

  blockquoteElem.appendChild(testimony_txtContainer);
  testimonyContainer.appendChild(blockquoteElem);

  testimonyElements.push(testimony_txtContainer);

  return testimony_txtContainer;
}

function showContent(degree) {
  console.log(degree);
  for(i = 0; i < elementDegrees.length; i ++) {
    if (i == 0) {
      if (degree > elementDegrees[i][0] && degree < elementDegrees[i][1] && testimonyElements[i].style.opacity == '0') {
        testimonyElements[testimonyElements.length - 1].style.opacity = '0';
        testimonyElements[i].style.opacity = '1';
        testimonyElements[i + 1].style.opacity = '0';
      }
    } else if (i == elementDegrees.length - 1) {
      if (degree > elementDegrees[i][0] && degree < elementDegrees[i][1] && testimonyElements[i].style.opacity == '0') {
        testimonyElements[i - 1].style.opacity = '0';
        testimonyElements[i].style.opacity = '1';
        testimonyElements[0].style.opacity = '0';
      }
    } else {
      if(degree > elementDegrees[i][0] && degree < elementDegrees[i][1] && testimonyElements[i].style.opacity == '0') {
        testimonyElements[i - 1].style.opacity = '0';
        testimonyElements[i].style.opacity = '1';
        testimonyElements[i + 1].style.opacity = '0';
      }
    }
  }
}
