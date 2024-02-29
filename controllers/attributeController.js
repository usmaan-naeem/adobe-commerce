const axios = require("axios");
const MagentoURL =
  "https://radwell-poc.tcqpz4yilg5zw.dummycachetest.com/rest/default/V1";
const adminToken = "8ry8ly8f0o31sqxpzoipzlhe4lso6z5b";

exports.createAttribute = async (attributeData) => {
  // let attribute = { ...attributeData };
  // delete attribute.value;
  // console.log({ attributeData });
  const url = `${MagentoURL}/products/attributes`;
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(url, { attribute: attributeData }, config);

    // console.log("==> ", response)
    return response.data;
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: error.toString() });
  }
};
