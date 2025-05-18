import axios from 'axios';
import './DogGenerator.css';

function createDogGenerator() {
  const container = document.createElement('div');
  container.className = 'container';

  const gifContainer = document.createElement('div');
  gifContainer.className = 'gif-container';
  gifContainer.setAttribute('role', 'region');
  gifContainer.setAttribute('aria-live', 'polite');
  gifContainer.setAttribute('aria-label', 'Random dog GIF display area');

  // Error message for screen readers
  const errorMsg = document.createElement('div');
  errorMsg.setAttribute('role', 'alert');
  errorMsg.style.position = 'absolute';
  errorMsg.style.left = '-9999px';
  container.appendChild(errorMsg);

  // const button = document.createElement('button');
  // button.className = 'md-sys-typescale-body-medium generate-button';
  // button.textContent = 'Generate';

  async function fetchDog() {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/images/search?mime_types=gif&order=random');
      const dogUrl = response.data[0].url;
      
      // Clear previous image if exists
      gifContainer.innerHTML = '';
      errorMsg.textContent = '';
      
      const img = document.createElement('img');
      img.src = dogUrl;
      img.alt = 'A random animated dog GIF';
      img.className = 'dog-gif';
      
      gifContainer.appendChild(img);
      
      // Add visible class after a small delay to trigger animation
      setTimeout(() => {
        gifContainer.classList.add('visible');
      }, 50);
    } catch (error) {
      errorMsg.textContent = 'Failed to load dog GIF. Please try again.';
      gifContainer.innerHTML = '';
    }
  }
const button = document.getElementById('generate-button');
  button.addEventListener('click', fetchDog);

  container.appendChild(gifContainer);
 

  return container;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  const app = createDogGenerator();
  document.getElementById('root').appendChild(app);
});
