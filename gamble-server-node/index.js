const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
require('dotenv').config()
const cors = require('cors')

var corsOptions = {
    // origin: 'http://localhost:21023, localhost:21023, http://192.168.56.1:21023',
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const client = require('./db')
client.connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/contacts', (req, res) => {
    const query = `SELECT * FROM public."Gemble.Contacts" WHERE ("public"."Gemble.Contacts"."id" = '1')`
    client.query(query)
        .then(result => {
            res.json(result.rows)
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        })
})

app.post('/contacts', (req, res) => {
    const { phone } = req.body;
    console.log(req.body)
    const query = `UPDATE public."Gemble.Contacts" SET phone = $1  WHERE id = $2;`;
    client.query(query, [phone, '1'])
        .then(result => {
            res.status(200).json({ message: "succcess" });
        })
        .catch(error => {
            console.error('Không thể cập nhật dữ liệu:', error);
            res.status(500).json({ error: error.message });
        });
});

app.get('/get-withdrawPassword-user', (req, res) => {
    const { userName } = req.query;
    const query = `SELECT * FROM public."Gamble.Users" WHERE ("public"."Gamble.Users"."UserName" = $1)`;
    client.query(query, [userName])
        .then(result => {
            let WithdrawPassword = ''
            if (result.rows.length < 1) return res.status(400).json({ status: 'not found', WithdrawPassword })
            WithdrawPassword = result.rows[0].WithdrawPassword
            res.status(200).json({ status: 'success', WithdrawPassword });
        })
        .catch(error => {
            console.error('Không thể cập nhật dữ liệu:', error);
            res.status(500).json({ error: error.message });
        });
});

app.post('/set-withdrawPassword-user', (req, res) => {
    const { withdrawPassword, userName } = req.body;
    const query = `UPDATE public."Gamble.Users" SET "WithdrawPassword" = $1 WHERE ("public"."Gamble.Users"."UserName" = $2)`;
    client.query(query, [withdrawPassword, userName])
        .then(result => {
            if (result.rowCount < 1) return res.status(400).json({ status: 'failed' });
            res.status(200).json({ status: 'success' });
        })
        .catch(error => {
            console.error('Không thể cập nhật dữ liệu:', error);
            res.status(500).json({ error: error.message });
        });
});

const PORT = process.env.PORT || 7171
server.listen(PORT, () => {
    console.log(`=> http://localhost:${PORT}`)
})