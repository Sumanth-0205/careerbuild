const app = require('./index');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
