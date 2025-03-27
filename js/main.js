
let productData = [];


async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    productData = await response.json();
    renderView('table');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function renderView(viewType) {
  const content = document.querySelector("#content")
  content.innerHTML = '';

  if (viewType === 'table') {
    content.innerHTML = `
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="border border-gray-300 px-4 py-2">#</th>
            <th class="border border-gray-300 px-4 py-2">Image</th>
            <th class="border border-gray-300 px-4 py-2">Title</th>
            <th class="border border-gray-300 px-4 py-2">Price</th>
            <th class="border border-gray-300 px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          ${productData.map((product, index) => `
            <tr class="bg-white border border-gray-300 hover:bg-gray-100">
              <td class="border border-gray-300 px-4 py-2">${index + 1}</td>
              <td class="border border-gray-300 px-4 py-2"><img src="${product.image}" class="w-12 h-12 object-contain"></td>
              <td class="border border-gray-300 px-4 py-2">${product.title}</td>
              <td class="border border-gray-300 px-4 py-2">$${product.price.toFixed(2)}</td>
              <td class="border border-gray-300 px-4 py-2">${product.category}</td>
            </tr>
          `).join('')}
        </tbody>
    </table>
    `
  } else if (viewType === 'vertical') {
    content.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${productData.map(product => `
          <div class="p-4 border border-gray-300 rounded-lg shadow bg-white">
            <img src="${product.image}" class="w-full h-40 object-contain mb-3">
            <h3 class="text-lg font-bold text-gray-800">${product.title}</h3>
            <p class="text-gray-600 font-semibold">$${product.price.toFixed(2)}</p>
            <span class="text-sm text-gray-500">${product.category}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (viewType === 'horizontal') {
    content.innerHTML = `
      <div class="space-y-4">
        ${productData.map(product => `
          <div class="flex items-center p-4 border border-gray-300 rounded-lg shadow bg-white">
            <img src="${product.image}" class="w-24 h-24 object-contain mr-4">
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-800">${product.title}</h3>
              <p class="text-gray-600 font-semibold">$${product.price.toFixed(2)}</p>
              <span class="text-sm text-gray-500">${product.category}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}
fetchProducts();
