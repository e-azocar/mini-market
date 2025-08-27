import app from './app';
import { PORT } from './config/constants';
import connectDB from './config/db';

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});
