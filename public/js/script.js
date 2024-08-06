function toggleAdoptionDate() {
  const adopted = document.getElementById('adopted').value;
  const adoptionDateField = document.getElementById('adoptionDateField');
  const ownerField = document.getElementById('owner');
  if (adopted === 'yes') {
    adoptionDateField.style.display = 'block';
    ownerField.value = ''; // Clear the owner field when adopted
  } else {
    adoptionDateField.style.display = 'none';
    const shelterSelect = document.getElementById('location');
    ownerField.value = shelterSelect.options[shelterSelect.selectedIndex].text;
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
