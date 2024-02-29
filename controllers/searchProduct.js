const axios = require("axios");
const { createAttribute } = require("./attributeController");

const apiURL =
  "https://radwell-poc.tcqpz4yilg5zw.dummycachetest.com/rest/default/V1/products";
const accessToken = "8ry8ly8f0o31sqxpzoipzlhe4lso6z5b";



exports.searchProduct = async (req, res) => {
  try {
    const response = await axios.get(`${apiURL}/product_test_1_1_2123`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.dir(response, { depth: null })
    return res.status(201).json({
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Failed to create product",
      error: error,
    });
  }
};
