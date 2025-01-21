// Handle modal visibility
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.querySelector('.close');

// Open the modal when the button is clicked
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the modal if the user clicks outside the modal
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle form submission to add data
document.getElementById('add-data-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  // Send POST request to the backend to add the data
  fetch('http://localhost:3000/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('New item added:', data);

      // Close the modal
      modal.style.display = 'none';

      // Reload the data table to display the new item
      fetchData();
    })
    .catch((error) => console.error('Error adding data:', error));
});

// Fetch data from the backend and display it in a table
const fetchData = () => {
  fetch('http://localhost:3000/api/data')
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
      table.innerHTML = ''; // Clear existing table rows

      data.sampleData.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.description}</td>
        `;
        table.appendChild(row);
      });

      // Show the table after fetching the data
      document.getElementById('data-table').style.display = 'table';

      // Enable search functionality after data is fetched
      enableSearch();
    })
    .catch((error) => console.error('Error fetching data:', error));
};

// Event listener for the "Fetch Data" button
document.getElementById('fetch-data-btn').addEventListener('click', fetchData);

// Search functionality
const enableSearch = () => {
  const searchInput = document.getElementById('search');
  const table = document.getElementById('data-table');
  const rows = table.getElementsByTagName('tr');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    Array.from(rows).forEach((row, index) => {
      if (index === 0) return; // Skip the header row

      const cells = row.getElementsByTagName('td');
      const name = cells[1].textContent.toLowerCase();
      const description = cells[2].textContent.toLowerCase();

      if (name.includes(query) || description.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
};

// Initialize the page by not fetching data until the "Fetch Data" button is clicked
document.addEventListener('DOMContentLoaded', () => {
  // Do nothing here for now, the fetch is triggered by the button click
});
