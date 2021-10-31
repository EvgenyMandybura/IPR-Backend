module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    creatorEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    creatorFullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
  });
  return Product;
};
