const form = document.getElementById('userForm');
const userList = document.getElementById('userList');
const userNameInput = document.getElementById('userName');

// Fonction pour charger la liste des usernes
async function loadusers() {
  const response = await fetch('/api/users');
  const users = await response.json();
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.textContent = user.name;
    userList.appendChild(li);
  });
}

// Événement pour l'ajout d'une userne
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = userNameInput.value.trim();
  if (name) {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    userNameInput.value = '';
    loadusers();
  }
});

// Charger la liste au démarrage
loadusers();