const { datatype, commerce } = require('faker');

module.exports = () => {
  const data = {
    products: [],
  };

  for (let i = 0; i < 1000; i++) {
    data.products.push({
      id: datatype.uuid(),
      price: commerce.price(),
      title: commerce.product(),
    });
  }

  return data;
};
