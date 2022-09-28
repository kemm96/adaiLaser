const express = require('express');
const cors = require('cors');

const config = require('../config.js');
const auth = require('./components/auth');
const clientes = require('./components/clientes')

// SETUP DEL SERVIDOR
const app = express();
app.use(express.json());
app.use(cors({
   origin: config.cors.origin,
   methods: ['GET','POST','DELETE','PUT'],
}));

// ROUER
app.use('/api/auth', auth);
app.use('/api/clientes', clientes);

app.listen(config.api.port, () => {
   console.log('Api escuchando en el puerto ', config.api.port);
});

/* ************************************************************ */
/*  ______   __   _   _____   __  __   _____   ______   ______  */
/* |___   | |  |_| | /     \ |  |/ /  /     \ |___   | |___   | */
/* .-` .-`  |   _  | |     | |     \  |     | |   ___| |___   | */
/* |______| |__| |_| \_____/ |__|\__\ \_____/ |______| |______| */
/*                                                              */
/*              [ September 2022 ] - Team Berlini               */
/*                All Copyrights Reserved © 2022                */
/*                                                              */
/* ************************************************************ */