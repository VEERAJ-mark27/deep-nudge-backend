const express = require('express');
const app = express();

const problemRoutes = require('./src/routes/problemRoutes');

const { router: attemptRoutes } = require('./src/routes/attemptRoutes');

app.use(express.json());

app.use('/problems', problemRoutes);
app.use('/attempts', attemptRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h2>Deep Nudge API </h2>
    <p>Available Endpoints:</p>
    <ul>
    <li>/problems/:id?step=1&userId=1</li>
    <li>/problems/weakness/:userId</li>
    <li>POST /attempts</li>
    </ul>
`);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});