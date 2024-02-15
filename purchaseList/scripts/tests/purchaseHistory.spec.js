const fetchMock = require('jest-fetch-mock');

// Mocking fetch API
global.fetch = fetchMock;

// Import function that fetches data and generates table rows
const { fetchDataAndGenerateTable } = require('./script');

describe('fetchDataAndGenerateTable', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches data from the API and generates table rows', async () => {
    const testData = [
      {
        name: 'Item 1',
        image: 'https://example.com/image1.jpg',
        description: 'Description of Item 1',
        purchaseDate: '2024-02-13',
        purchasePrice: '$10',
        category: 'Category 1'
      },
      {
        name: 'Item 2',
        image: 'https://example.com/image2.jpg',
        description: 'Description of Item 2',
        purchaseDate: '2024-02-14',
        purchasePrice: '$15',
        category: 'Category 2'
      }
    ];

    fetchMock.mockResponseOnce(JSON.stringify(testData));

    document.body.innerHTML = '<table id="item-table"><tbody></tbody></table>';

    await fetchDataAndGenerateTable();

    const rows = document.querySelectorAll('#item-table tbody tr');
    expect(rows.length).toBe(2);

    // Check the content of the first row
    expect(rows[0].innerHTML).toContain('Item 1');
    expect(rows[0].innerHTML).toContain('<img src="https://example.com/image1.jpg" alt="Item 1">');
    expect(rows[0].innerHTML).toContain('Description of Item 1');
    expect(rows[0].innerHTML).toContain('2024-02-13');
    expect(rows[0].innerHTML).toContain('$10');
    expect(rows[0].innerHTML).toContain('Category 1');

    // Check the content of the second row
    expect(rows[1].innerHTML).toContain('Item 2');
    expect(rows[1].innerHTML).toContain('<img src="https://example.com/image2.jpg" alt="Item 2">');
    expect(rows[1].innerHTML).toContain('Description of Item 2');
    expect(rows[1].innerHTML).toContain('2024-02-14');
    expect(rows[1].innerHTML).toContain('$15');
    expect(rows[1].innerHTML).toContain('Category 2');
  });
});
