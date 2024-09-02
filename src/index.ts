 import dotenv from 'dotenv';
import express from 'express';
import sequelize from './utils/db';
import { json } from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/UsersRoutes';
// dotenv.config();

const app = express();
app.use(json());

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware
app.use(cors(corsOptions));

 app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Server setup correctly!');
});

sequelize.sync().then(() => {
   console.log('Database & tables created!');

    // Start the server after the database is synced
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
   console.error('Unable to sync database:', err);
});
