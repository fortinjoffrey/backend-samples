import express from 'express';
import {User} from 'shared-backend-core';

const app = express();
app.use(express.json());

const user: User = {
  id: '2',
  email: 'jane.doe@gmail.com',
  name: 'Jane Doe',
  createdAt: new Date(),
};

app.get('/user', (req, res) => {
  res.json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`B2B API running on port ${PORT}`);
});
