const vnData = {
    "Scene1": {
      "PAGES": {
        "Page0": {
          "PageText": "Welcome to the game!",
          "Options": {
            "Option 1": "Page1",
            "Option 2": "Page2",
            "Option 3": "Page3"
          }
        },
        "Page1": {
          "PageText": "You chose option 1!"
        },
        "Page2": {
          "PageText": "You chose option 2!"
        },
        "Page3": {
          "PageText": "You chose option 3!"
        }
      }
    }
  };
  
  let pageNum = 0, currentPage;
  
  function initialize() {
    const $textbox = document.querySelector("#textbox p");
    const $optionsbox = document.querySelector('#optionsbox');
    
    currentPage = Object.keys(vnData.Scene1.PAGES)[pageNum];
    $textbox.innerText = vnData.Scene1.PAGES[currentPage].PageText;
    
    if (vnData.Scene1.PAGES[currentPage].hasOwnProperty('Options')) {
      const options = vnData.Scene1.PAGES[currentPage].Options;
      Object.keys(options).forEach((key) => {
        const option = document.createElement('div');
        option.innerText = key;
        option.addEventListener('click', () => {
          pageNum = Object.keys(vnData.Scene1.PAGES).indexOf(options[key]);
          initialize();
        });
        $optionsbox.appendChild(option);
      });
    } else {
      $optionsbox.innerHTML = '';
    }
  }
  
  initialize();