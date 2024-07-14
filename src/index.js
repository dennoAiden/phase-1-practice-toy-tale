document.addEventListener('DOMContentLoaded', () => {
    const toyCollection = document.getElementById('toy-collection');
    const addToyForm = document.querySelector('.add-toy-form');
    const newToyBtn = document.getElementById('new-toy-btn');

    // Function to fetch and display toys
    function fetchAndDisplayToys() {
        fetch('http://localhost:3000/toys') // Replace with the actual API URL
            .then(response => response.json())
            .then(data => {
                data.forEach(toy => {
                    createToyCard(toy);
                });
            })
            .catch(error => {
                console.error('Error fetching toys:', error);
            });
    }

    // Function to create a new toy card
    function createToyCard(toy) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const toyName = document.createElement('h2');
        toyName.textContent = toy.name;

        const toyImage = document.createElement('img');
        toyImage.src = toy.image;
        toyImage.classList.add('toy-avatar');

        const toyLikes = document.createElement('p');
        toyLikes.textContent = `${toy.likes} Likes`;

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-btn');
        likeButton.id = toy.id;
        likeButton.textContent = 'Like ❤️';

        // Append elements to the card
        cardDiv.appendChild(toyName);
        cardDiv.appendChild(toyImage);
        cardDiv.appendChild(toyLikes);
        cardDiv.appendChild(likeButton);

        // Append card to toy collection
        toyCollection.appendChild(cardDiv);
    }

    // Handle form submission
    addToyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const toyName = event.target.name.value;
        const toyImage = event.target.image.value;

        const newToy = {
            name: toyName,
            image: toyImage,
            likes: 0 // Initial likes count
        };

        // Make a POST request to create a new toy
        fetch('http://localhost:3000/toys', { // Replace with the actual API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newToy)
        })
        .then(response => response.json())
        .then(createdToy => {
            // Create and add the toy card to the DOM
            createToyCard(createdToy);
            // Clear the form
            event.target.reset();
        })
        .catch(error => {
            console.error('Error creating toy:', error);
        });
    });

    // Toggle form visibility
    let addToy = false;
    newToyBtn.addEventListener('click', () => {
        addToy = !addToy;
        if (addToy) {
            addToyForm.style.display = 'block';
        } else {
            addToyForm.style.display = 'none';
        }
    });

    // Fetch and display toys on page load
    fetchAndDisplayToys();
});
function updateLikes(toyId, newLikes, toyLikesElement) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ likes: newLikes })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(updatedToy => {
      console.log('Updated toy:', updatedToy); // Debugging
      // Update the likes count in the DOM
      toyLikesElement.textContent = `${updatedToy.likes} Likes`;
  })
  .catch(error => {
      console.error('Error updating likes:', error);
  });
}

// Toggle form visibility
let addToy = false;
newToyBtn.addEventListener('click', () => {
  addToy = !addToy;
  if (addToy) {
      addToyForm.style.display = 'block';
  } else {
      addToyForm.style.display = 'none';
  }
});

// Fetch and display toys on page load
fetchAndDisplayToys();