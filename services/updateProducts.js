// // const fetch = require('node-fetch');

// const apiURL =
//   "https://radwell-poc.tcqpz4yilg5zw.dummycachetest.com/rest/default/async/bulk/V1/products/bySku";
// const accessToken = "8ry8ly8f0o31sqxpzoipzlhe4lso6z5b";

// async function updateProductPricesBulk(products) {
//   const fetch = (await import("node-fetch")).default;
//   const payload = products.map((product) => ({
//     sku: product.productView.sku,
//     price: 24,
//   }));

//   const response = await fetch(apiURL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   const responseData = await response.json();

//   console.dir(responseData, { depth: null });
//   // The response from a bulk operation typically includes a way to track the operation's progress.
//   return responseData;
// }

// const fetch = (await import("node-fetch")).default;

const apiURL = "https://radwell-poc.tcqpz4yilg5zw.dummycachetest.com/rest/default/async/bulk/V1/products/bySku";
const accessToken = "8ry8ly8f0o31sqxpzoipzlhe4lso6z5b";

async function updateChunk(chunk) {
  console.log({ chunk })
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(chunk),
  });

  // if (!response.ok) {
  //   throw new Error(`HTTP error! Status: ${response.status}`);
  // }

  // const result = response.jaon()

  console.dir(response, { depth: null })
  return response;
}

async function updateProductPricesBulk(products, chunkSize = 100) {
  // Creating chunks
  const chunks = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize).map(product => ({
      sku: product.productView.sku,
      price: 24,
    }));
    chunks.push(chunk);
  }

  // Processing chunks in parallel, respecting a manageable concurrency limit
  const updatePromises = chunks.map(chunk => updateChunk(chunk));

  // Wait for all chunks to be processed
  const results = await Promise.allSettled(updatePromises);

  console.dir(results, { depth: null });
  // Optionally, process results to handle any rejections or failures
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Chunk ${index + 1} failed:`, result.reason);
    } else {
      console.log(`Chunk ${index + 1} succeeded:`, result.value);
    }
  });

  return results; // This will include both fulfilled and rejected promises
}

module.exports = { updateProductPricesBulk };