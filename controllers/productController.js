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
    // const attributes = reqBody.attributes || [];
    // const product = reqBody.product;

    // let attributes_codes;
    // if (attributes.length > 0) {
    //     attributes_codes = await createAndStoreAttributes(attributes)
    // }

    // const custom_attributes = attributes_codes.map(code => {
    //     return {
    //         attribute_code: code.attribute_code,
    //         value: code.attribute_id || ""
    //     }
    // });

    // console.log("===>  <=== ", custom_attributes)
    // const product_data = {
    //     product: {
    //       ...product,
    //     custom_attributes
    //     }
    // }

    // console.log("===> ", product_data)
    const response = await axios.put(
      `${apiURL}/products/product_dynamic_74192218`,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.dir(response, { depth: null });
    res.send(
      JSON.stringify({
        message: "Product created successfully",
        data: response,
      })
    );
  } catch (error) {
    console.dir(error, { depth: null });
    res.status(500).json({
      message: "Failed to create product",
      error: error,
    });
  }
};
