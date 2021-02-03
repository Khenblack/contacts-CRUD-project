import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import './domain/services/inversify.config';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/contacts', userRoutes);
app.use(errorHandlerMiddleware);
mongoose
  .connect('mongodb://localhost:27017/contactsDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    app.listen(4000);
    console.log(`Server listening on port 4000`);
  })
  .catch((err) => console.log(err));
