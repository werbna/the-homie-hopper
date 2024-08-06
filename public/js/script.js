function toggleAdoptionDate() {
  const adopted = document.getElementById('adopted').value;
  const adoptionDateField = document.getElementById('adoptionDateField');
  const ownerField = document.getElementById('ownerField');
  const ownerLabel = document.getElementById('ownerLabel');

  if (adopted === 'yes') {
    adoptionDateField.style.display = 'block';
    ownerField.style.display = 'block';
    ownerLabel.style.display = 'block';
  } else {
    adoptionDateField.style.display = 'none';
    ownerField.style.display = 'none';
    ownerLabel.style.display = 'none';
  }
}

function showFavorites() {
  const favoriteByList = document.getElementById('favoriteByList');
  if (favoriteByList.style.display === 'none' || favoriteByList.style.display === '') {
    favoriteByList.style.display = 'block';
  } else {
    favoriteByList.style.display = 'none';
  }
}

function favoriteAnimal(animalId) {
  fetch(`/animals/${animalId}/favorite`, {
    method: 'POST'
  }).then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Animal favorited!');
    } else {
      alert('Error favoriting animal.');
    }
  }).catch(error => console.error('Error:', error));
}

window.onload = function() {
  toggleAdoptionDate();
};
