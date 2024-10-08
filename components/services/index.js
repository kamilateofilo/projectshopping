const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/save-token', (req, res) => {
  const { token } = req.body;
  console.log('Received token:', token);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
