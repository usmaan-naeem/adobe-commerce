// const fetch = require('node-fetch');

async function fetchGraphQL(query) {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(process.env.ADOBE_COMMERCE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${process.env.ADOBE_COMMERCE_AUTH_TOKEN}`,
      'Magento-Environment-Id': '251f451b-d924-4658-ad18-1978f52b486d',
      'X-Api-Key': 'b8f3768b6065436aac68951dcc709ad8',
      'Magento-Website-Code': 'base',
      'Magento-Store-Code': 'main_website_store',
      'Magento-Store-View-Code': 'default',
      'Magento-Customer-Group': 'hello',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}

module.exports = fetchGraphQL;
