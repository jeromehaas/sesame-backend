const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const sequelize = new Sequelize('sesame-test', 'peter', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});
const db = {};
const allFiles = fs.readdirSync(__dirname);
const filteredFiles = allFiles.filter((file) => file.indexOf('.') !== 0 && file !== 'index.model.js' && file.slice(-3) === '.js');
filteredFiles.forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
//# sourceMappingURL=index.models.js.map