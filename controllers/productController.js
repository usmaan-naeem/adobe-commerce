const axios = require("axios");
const { createAttribute } = require("./attributeController");

const apiURL =
  "https://radwell-poc.tcqpz4yilg5zw.dummycachetest.com/rest/default/V1";
const accessToken = "8ry8ly8f0o31sqxpzoipzlhe4lso6z5b";


async function createAndStoreAttributes(attributes) {
    const results = [];
  
    for (const attribute of attributes) {
      const result = await createAttribute(attribute);
      results.push(result);
    }
  
    return results;
  }

exports.createProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    const attributes = reqBody.attributes || [];
    const product = reqBody.product;

    let attributes_codes;
    if (attributes.length > 0) {
        attributes_codes = await createAndStoreAttributes(attributes)
    }

    const custom_attributes = attributes_codes.map(code => {
        return {
            attribute_code: code,
            value: attributes.find(attr => attr.attribute_code === code)?.value || ""
        }
    });

    const product_data = {
        ...product,
        custom_attributes
    }

    console.dir(product_data, { depth: null })
    const response = await axios.post(`${apiURL}/products`, product, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: "Failed to create product",
      error: error,
    });
  }
};
