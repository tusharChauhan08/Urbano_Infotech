const app = require('./src/app');
const { sequelize } = require('./model/user');

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
