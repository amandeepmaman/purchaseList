// Function to format a date from 'YYYY-MM-DDTHH:MM:SS.ZZZZ' to 'Month, Day, Year'
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Function to format purchase price from cents to dollars with two decimal places
const formatPurchasePrice = (priceInCents) => {
  const dollars = priceInCents / 100;
  return `$${dollars.toFixed(2)}`;
};

// Add class to category td based on category
const getCategoryClass = (category) => {
  switch (category) {
    case 'Technology':
      return 'technology-category';
    case 'Entertainment':
      return 'entertainment-category';
    case 'Automotive':
      return 'automotive-category';
    case 'Shopping':
      return 'shopping-category';
    default:
      return '';
  }
};

// Function to fetch data and generate table rows
const fetchDataAndGenerateTable = async () => {
  try {
    // Fetch data from the API
    const response = await fetch('https://storage.googleapis.com/marketplace-prod-7728-shop-cdn-e5e2/interview/data.json');
    const data = await response.json();

    // Get table body element
    const tableBody = document.querySelector('#item-table tbody');

    // Loop through each item in the data and generate table rows
    data.forEach(item => {
      const row = document.createElement('tr');
      
      // Get category class for styling
      const categoryClass = getCategoryClass(item.category);

      // Populate the row with item data
      row.innerHTML = `
        <td class="empty-row desktop-view"></td>
        <td class="name font700 desktop-view">${item.name}</td>
        <td class="desktop-view"><img src="${item.location}" alt="${item.name}"></td>
        <td class="desktop-view">${formatDate(item.purchaseDate)}</td>
        <td class="desktop-view">
          <span class="${categoryClass}">${item.category}</span>
        </td>
        <td class="desktop-view">${item.description}</td>
        <td class="font700 desktop-view">${formatPurchasePrice(item.price)}</td>
        <td class="three-dots desktop-view">&#xFE19;</td>
        <td class="mobile-view">
          <div class="item-info">
            <img src="${item.location}" alt="${item.name}">
            <span class="name font700">${item.name}</span>
            <span class="font700 purchase-price">${formatPurchasePrice(item.price)}</span>
          </div>
          <p class="description">${item.description}</p>
          <span class="font700">Purchase Date</span></br>
          <span>${formatDate(item.purchaseDate)}</span>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to fetch data and generate table rows
fetchDataAndGenerateTable();
