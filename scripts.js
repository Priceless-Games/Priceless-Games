const username = 'player1'; // Replace with dynamic username logic

document.getElementById('start-farming').addEventListener('click', async () => {
  await fetch(`/start/${username}`, { method: 'POST' });
  alert('Farming started!');
});

document.getElementById('claim-points').addEventListener('click', async () => {
  const response = await fetch(`/tasks/${username}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ points: 50 }) // Example task points
  });
  const data = await response.json();
  alert(`Points claimed! Total points: ${data.totalPoints}`);
});

const updatePoints = async () => {
  const response = await fetch(`/home/${username}`);
  const data = await response.json();
  document.getElementById('points-value').textContent = data.points;
};

const updateFriendsList = async () => {
  const response = await fetch(`/friends/${username}`);
  const data = await response.json();
  const friendsList = document.getElementById('friends-list');
  friendsList.innerHTML = '';
  data.friendsPoints.forEach(friend => {
    const friendDiv = document.createElement('div');
    friendDiv.textContent = `${friend.username}: ${friend.points} points`;
    friendsList.appendChild(friendDiv);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  updatePoints();
  updateFriendsList();
});
