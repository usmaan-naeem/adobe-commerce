const axios = require('axios');
const MagentoURL = 'https://radwell-poc.tcqpz4yilg5zw.dummycachetest.com/rest/default/V1';
const adminToken = '8ry8ly8f0o31sqxpzoipzlhe4lso6z5b';

exports.uploadMedia = async (req, res) => {
    const { sku, mediaData } = req.body;
    const url = `${MagentoURL}/products/${sku}/media`;
    const config = {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const response = await axios.post(url, mediaData, config);
      res.json({ message: 'Media uploaded and associated with product successfully', data: response.data });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };
  