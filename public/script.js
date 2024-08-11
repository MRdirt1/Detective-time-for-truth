const vnData = {
    "Scene1": {
      "PAGES": {
        "Page0": {
          "PageText": [
            "Biuro bankiera Johnathana Cartera na Wall Street po godzinach pracy. Atmosfera jest mroczna, z migoczącymi światłami latarni za oknem. Na podłodze leży ciało Cartera, a wokół niego widoczne są ślady krwi. Pokój wygląda, jakby ktoś szukał czegoś w pośpiechu.",
            "Kapitan O'Leary: (szorstko) No dobra, Blackstone. To jest miejsce zdarzenia. Johnathan Carter, jeden z największych bankierów na Wall Street. Ktoś postanowił zakończyć jego karierę... w brutalny sposób.",
            "Nick: (przyglądając się biuru) Widzę... Biuro wygląda na przeszukane, ale nie ma śladów włamania. Kto pierwszy znalazł ciało?",
            "Kapitan O'Leary: Sprzątaczka. Znalazła go martwego po tym, jak usłyszała hałas. Ale biuro było zamknięte, a okna zabezpieczone. Sprawca musiał znać Cartera albo znać to miejsce.",
            "Nick: A sejf? Widzę, że jest otwarty.",
            "Kapitan O'Leary: Pusty. Carter zawsze trzymał tam coś wartościowego, ale teraz nic nie ma. Może to tylko przypadek, a może nie."
          ],
          "BackgroundImage": "styles/background1.jpg",
          "Options": {
            "Option 1": "Page1",
            "Option 2": "Page2",
            "Option 3": "Page3"
          }
        },
        "Page1": {
          "PageText": "You chose option 1!",
          "BackgroundImage": "styles/background1.jpg",
          "NextPage": "Page4"
        },
        "Page2": {
          "PageText": "You chose option 2!",
          "BackgroundImage": "styles/background1.jpg",
          "NextPage": "Page5"
        },
        "Page3": {
          "PageText": "You chose option 3!",
          "BackgroundImage": "styles/background1.jpg",
          "NextPage": "Page6"
        },
        "Page4": {
          "PageText": "This is page 4!",
          "BackgroundImage": "styles/background1.jpg",
          "Options": {
            "Option 4": "Page7",
            "Option 5": "Page8"
          }
        },
        "Page5": {
          "PageText": "This is page 5!",
          "BackgroundImage": "styles/background1.jpg",
          "Options": {
            "Option 6": "Page9",
            "Option 7": "Page10"
          }
        },
        "Page6": {
          "PageText": "This is page 6!",
          "BackgroundImage": "styles/background1.jpg",
          "Options": {
            "Option 8": "Page11",
            "Option 9": "Page12"
          }
        },
        // Add more pages as needed
      }
    }
  };
  
  let pageNum = 0, currentPage, dialogueIndex = 0;

function initialize() {
  const $textbox = document.querySelector("#textbox p");
  const $optionsbox = document.querySelector('#optionsbox');
  const $background = document.querySelector('#background');

  currentPage = Object.keys(vnData.Scene1.PAGES)[pageNum];
  $background.style.backgroundImage = `url(${vnData.Scene1.PAGES[currentPage].BackgroundImage})`;

  if (Array.isArray(vnData.Scene1.PAGES[currentPage].PageText)) {
    $textbox.innerText = vnData.Scene1.PAGES[currentPage].PageText[dialogueIndex];
  } else {
    $textbox.innerText = vnData.Scene1.PAGES[currentPage].PageText;
  }

  $optionsbox.style.display = 'none';
  $textbox.style.display = 'block';
}

document.querySelector('#skipButton').addEventListener('touchend', function() {
  if (Array.isArray(vnData.Scene1.PAGES[currentPage].PageText)) {
    dialogueIndex++;
    if (dialogueIndex >= vnData.Scene1.PAGES[currentPage].PageText.length) {
      if (vnData.Scene1.PAGES[currentPage].hasOwnProperty('Options')) {
        // Populate the $optionsbox element with the options
        const $optionsbox = document.querySelector('#optionsbox');
        $optionsbox.innerHTML = '';
        Object.keys(vnData.Scene1.PAGES[currentPage].Options).forEach((option, index) => {
          const $option = document.createElement('div');
          $option.textContent = option;
          $option.addEventListener('touchend', function() {
            currentPage = vnData.Scene1.PAGES[currentPage].Options[option];
            pageNum = Object.keys(vnData.Scene1.PAGES).indexOf(currentPage);
            dialogueIndex = 0;
            initialize();
          });
          $optionsbox.appendChild($option);
        });
        $optionsbox.style.display = 'block';
      } else if (vnData.Scene1.PAGES[currentPage].hasOwnProperty('NextPage')) {
        currentPage = vnData.Scene1.PAGES[currentPage].NextPage;
        pageNum = Object.keys(vnData.Scene1.PAGES).indexOf(currentPage);
        dialogueIndex = 0;
        initialize();
      }
    } else {
      const $textbox = document.querySelector("#textbox p");
      $textbox.innerText = vnData.Scene1.PAGES[currentPage].PageText[dialogueIndex];
    }
  } else {
    if (vnData.Scene1.PAGES[currentPage].hasOwnProperty('Options')) {
      // Populate the $optionsbox element with the options
      const $optionsbox = document.querySelector('#optionsbox');
      $optionsbox.innerHTML = '';
      Object.keys(vnData.Scene1.PAGES[currentPage].Options).forEach((option, index) => {
        const $option = document.createElement('div');
        $option.textContent = option;
        $option.addEventListener('touchend', function() {
          currentPage = vnData.Scene1.PAGES[currentPage].Options[option];
          pageNum = Object.keys(vnData.Scene1.PAGES).indexOf(currentPage);
          dialogueIndex = 0;
          initialize();
        });
        $optionsbox.appendChild($option);
      });
      $optionsbox.style.display = 'block';
    } else if (vnData.Scene1.PAGES[currentPage].hasOwnProperty('NextPage')) {
      currentPage = vnData.Scene1.PAGES[currentPage].NextPage;
      pageNum = Object.keys(vnData.Scene1.PAGES).indexOf(currentPage);
      initialize();
    }
  }
});

// Add event listener for window resize to adjust layout
window.addEventListener('resize', function() {
  const $textbox = document.querySelector("#textbox p");
  const $optionsbox = document.querySelector('#optionsbox');
  const $background = document.querySelector('#background');

  // Adjust layout based on screen size
  if (window.innerWidth < 768) {
    // Mobile layout
    $textbox.style.fontSize = '16px';
    $optionsbox.style.fontSize = '16px';
  } else {
    // Desktop layout
    $textbox.style.fontSize = '24px';
    $optionsbox.style.fontSize = '24px';
  }
});

initialize();