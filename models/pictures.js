module.exports = function (sequelize, DataTypes) {
    const Picture = sequelize.define('Picture', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        creatorEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });
    return Picture;
};
