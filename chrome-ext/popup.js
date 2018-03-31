let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;

  chrome.windows.getCurrent(function (currentWindow) {
      chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
          activeTabs.map(function (tab) {
              chrome.tabs.executeScript(tab.id, {code: 'document.body.style.backgroundColor = "' + color + '";'});
          });
      });
  });
};
