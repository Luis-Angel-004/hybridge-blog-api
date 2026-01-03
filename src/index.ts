import express from 'express';
import passport from 'passport';
import { PORT } from './config.js';
import { jwtStrategy } from './middlewares/auth.middleware.js';
import apiRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);

app.get('/', (_, res) => res.json({ message: 'Hybridge Blog API is running!' }));
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});