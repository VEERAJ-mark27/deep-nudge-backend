const express = require('express');
const app = express();

const problemRoutes = require('./src/routes/problemRoutes');

const { router: attemptRoutes } = require('./src/routes/attemptRoutes');

app.use(express.json());

app.use('/problems', problemRoutes);
app.use('/attempts', attemptRoutes);

app.get('/', (req, res) => {
  res.send('Deep Nudge API Running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});