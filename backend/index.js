const app = require('./app');
const DbConnect = require('./db/db_connection');
const userRoutes = require('./routes/router');

DbConnect();

app.use(userRoutes);

app.use((req, res, next) => {
  const error = new Error('Invalid Request');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
const PORT = process.env.PORT || 4200;
app.listen(PORT, console.log(`server is running http://localhost:3000`));
