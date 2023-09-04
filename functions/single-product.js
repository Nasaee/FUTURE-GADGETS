// domain/.netlify/functions/single-product

const dotenv = require('dotenv');
dotenv.config();

const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async function (event, context, callback) {
  const { id } = event.queryStringParameters;
  try {
    let product = await airtable.retrieve(id);
    console.log(product);
    if (product.error) {
      return {
        statusCode: 404,
        body: `No product with id: ${id}`,
      };
    }
    product = { id: product.id, ...product.fields };
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Server Error`,
    };
  }
};
