const { Sequelize, DataTypes } = require('sequelize')
const { DATABASE } = require("../config.json")

const sequelize = new Sequelize(DATABASE.database, DATABASE.username, DATABASE.password, DATABASE.options)


const Announcements = sequelize.define('Announcements', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Author: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    Content: {
        type: DataTypes.JSON,
        allowNull: false,   
    },
    MessageID: {
        type: DataTypes.BIGINT,
    },
    Published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})

const Edits = sequelize.define('Edits', {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Author: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    OldContent: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    NewContent: {
        type: DataTypes.JSON,
        allowNull: false,
    }
})

Announcements.hasMany(Edits);
Edits.belongsTo(Announcements);

(async () => {
    await sequelize.sync({alter: true});
})();


module.exports = sequelize;