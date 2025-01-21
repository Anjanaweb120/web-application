const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
