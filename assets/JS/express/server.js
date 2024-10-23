import express from 'express'
import path from "path";
import { fileURLToPath } from "url";
import { getQuery, getGoods, getadd_to_coffee, getvolume_price } from './db.js'




const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к корню проекта
const projectRoot = path.resolve(__dirname, '../..');

app.use(express.static(path.join(projectRoot, 'public/css')));
app.use(express.static(path.join(projectRoot, 'public/img')));
app.use(express.static(path.join(projectRoot, 'JS')));
app.use(express.static(path.join(projectRoot, 'constants')));


app.set('view engine', 'html');

const goods = [];
app.get('/api', async (req, res) => {
	const goods = await getGoods()
	const additives = await getadd_to_coffee()
	const volumes = await getvolume_price()
	res.json({ Goods: goods, Additives: additives, Volumes: volumes })
})

app.get('/', async (req,res) => {
    
    res.sendFile(path.join(projectRoot, 'views/main/index.html'));
})

const PORT = 3000
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
    console.log('Сервер запущен!')
})