import express from 'express';
import userRouter from './routes/UserRoutes';

class App {
    public app: express.Express;

    constructor() {
        this.app = express();
        this.config();
    }

    public config(): void {
        const accessControl: express.RequestHandler = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };

        this.app.use(express.json());
        this.app.use(accessControl);
        this.app.use('/users', userRouter);
        this.app.get('/', (_req, res) => res.json({message: 'Working!'})) // - Rota para testar se o backend esta online
    }

    public start(PORT: string | number): void {
        this.app.listen(PORT, () => console.log(`Server online na porta ${PORT}`));
    }

}

export default App;