// domain/.netlify/functions/single-product

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: 'single product route',
  };
};
