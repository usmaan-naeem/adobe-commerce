const axios = require("axios");
const MagentoURL =
  "https://radwell-poc.tcqpz4yilg5zw.dummycachetest.com/rest/default/V1";
const adminToken = "8ry8ly8f0o31sqxpzoipzlhe4lso6z5b";
// V1/categories
exports.createCategory = async (req, res) => {
  const categoryData = req.body;
  const url = `${MagentoURL}/categories`;
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    console.log(categoryData);
    const response = await axios.post(url, categoryData, config);
    console.log(response);
    res.status(200).json({
      message: "Product created successfully",
    });
   
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: error.toString() });
  }
};
