const fetchGraphQL = require("../utils/graphql");

async function fetchProducts() {
  const totalProducts = 100;
  const pageSize = 20;
  let currentPage = 1;
  let products = [];

  while (products.length < totalProducts) {
    const query = `
      {
        productSearch(phrase: "", page_size: ${pageSize}, current_page: ${currentPage}) {
          items {
            productView {
              sku
              shortDescription
              ... on SimpleProductView {
                price {
                  final {
                    amount {
                      value
                      currency
                    }
                  }
                  regular {
                    amount {
                      value
                      currency
                    }
                  }
                }
              }
            }
          }
          total_count
        }
      }
    `;

    try {
      const data = await fetchGraphQL(query);
      products = products.concat(data.productSearch.items);

      if (data.productSearch.items.length < pageSize) {
        // Break if the last fetch returned less than pageSize, indicating no more products
        break;
      }

      currentPage++;
    } catch (error) {
      console.error("Error in productSearchService:", error);
      throw error;
    }
  }

  // If more than totalProducts are fetched, trim the array
  return products.slice(0, totalProducts);
}

module.exports = { fetchProducts };
