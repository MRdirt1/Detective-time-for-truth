
      let currentState = 'Scene1';
      let currentPage = 0;
  
      const backgroundElement = document.getElementById('background');
      const characterElement = document.getElementById('character');
      const pageTextElement = document.getElementById('page-text');
      const answersElement = document.getElementById('answers')
  
      // Load the JSON data from the VNData.json file
      fetch('VNData.json')
        .then(response => response.json())
        .then(data => {
          const gameData = data;
          updatePage(gameData);
        })
        .catch(error => console.error('Error loading JSON file:', error));
  
      function updatePage(gameData) {
        const scene = gameData[currentState];
        const page = scene.PAGES[currentPage];
  
        backgroundElement.src = scene.Background;
        characterElement.src = `characters/${page.Character}/${page.Sprite}.png`;
        pageTextElement.textContent = page.PageText;
  
        answersElement.innerHTML = '';
        if (page.Answers) {
          Object.keys(page.Answers).forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => {
              currentState = page.Answers[answer];
              currentPage = 0;
              updatePage(gameData);
            });
            answersElement.appendChild(button);
          });
        } else {
          // Display three option buttons with different endings
          const options = [
            { text: 'Option 1', nextScene: 'Scene2' },
            { text: 'Option 2', nextScene: 'Scene3' },
            { text: 'Option 3', nextScene: 'Scene4' },
          ];
  
          options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.addEventListener('click', () => {
              currentState = option.nextScene;
              currentPage = 0;
              updatePage(gameData);
            });
            answersElement.appendChild(button);
          });
        }
      }
  