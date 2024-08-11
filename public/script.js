const vnData = '/projects/vnengine/VNData.json';

let json, pageNum = 0, currentPage;

async function grabData() {
  const resp = await fetch(vnData);
  json = await resp.json();
  currentPage = Object.keys(json.Scene1.PAGES)[pageNum];
  initialize(json);
  handleOptions(json);
}

function initialize(data) {
  const $textbox = document.querySelector("#textbox p");
  const $optionsbox = document.querySelector('#optionsbox');
  
  $textbox.innerText = data.Scene1.PAGES[currentPage].PageText;
  
  if (data.Scene1.PAGES[currentPage].hasOwnProperty('Options')) {
    const options = data.Scene1.PAGES[currentPage].Options;
    Object.keys(options).forEach((key) => {
      const option = document.createElement('div');
      option.innerText = key;
      option.addEventListener('click', () => {
        currentPage = options[key];
        pageNum = Object.keys(json.Scene1.PAGES).indexOf(currentPage);
        initialize(json);
      });
      $optionsbox.appendChild(option);
    });
  }
}

grabData();