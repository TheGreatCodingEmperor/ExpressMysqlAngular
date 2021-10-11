module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        username: {
            type: Sequelize.STRING,
            required: true,
            minlength: 3,
            maxlength: 12
        },
        salt: {
            type: Sequelize.STRING,
            required: true
        },
        hash: {
            type: Sequelize.STRING,
            required: true
        },
        email: {
            type: Sequelize.STRING,
            maxlength: 128
        }
    });

    return Account;
};
