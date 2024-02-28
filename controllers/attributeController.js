const axios = require("axios");
const MagentoURL =
  "https://radwell-poc.tcqpz4yilg5zw.dummycachetest.com/rest/default/V1";
const adminToken = "8ry8ly8f0o31sqxpzoipzlhe4lso6z5b";

exports.createAttribute = async (attributeData) => {
    let attribute = { ...attributeData };
    delete attribute.value;
  console.log({ attribute });
  const url = `${MagentoURL}/products/attributes`;
  const config = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      url,
      { attribute: attribute },
      config
    );
    return response.data?.attribute_code || "";
  } catch (error) {
    console.log(error);
    // res.status(500).json({ error: error.toString() });
  }
};
