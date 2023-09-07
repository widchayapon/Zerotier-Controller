/*
  ztncui - ZeroTier network controller UI
  Copyright (C) 2017-2021  Key Networks (https://key-networks.com)
  Licensed under GPLv3 - see LICENSE for details.
*/
const axios = require('axios'); // nodes
const express = require('express');
const auth = require('../controllers/auth');
const authenticate = auth.authenticate;
const restrict = auth.restrict;
const router = express.Router();
var ping = require('ping');
const { MongoClient, ServerApiVersion } = require('mongodb');
/** Redirect logged user to controler page */
function guest_only(req, res, next) {
    if (req.session.user) {
        res.redirect('/controller/networks');
    } else {
        next();
    }
}
router.get('/footer', async function(req, res, next) {
    const x = await axios.post('http://172.20.10.4/api_jsonrpc.php', {

            jsonrpc: "2.0",
            method: "host.get",
            params: {
                output: [
                    "hostid",
                    "host",
                    "extend"
                ],
                selectInterfaces: [
                    "interfaceid",
                    "ip"
                ]
            },
            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1


        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    console.log(x)
    res.render('footer', { title: 'ztncui', data: x });
});
router.get('/loading', guest_only, function(req, res, next) {
    res.render('loading', { title: 'ztncui' });
});
router.get('/loadingiperf', function(req, res, next) {
    res.render('loadingiperf', { title: 'ztncui' });
});
router.get('/token', guest_only, async function(req, res, next) {
    const x = await axios.post('http://172.20.10.4/api_jsonrpc.php', {

            jsonrpc: "2.0",
            method: "token.get",
            params: {
                output: "extend",
                tokenids: "1"
            },
            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1


        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    console.log(x)
    res.render('token', { title: 'ztncui', data: x });
});
router.get('/Ubuntu', async function(req, res, next) {
    //Core
    const core = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44875"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    //Load average (1m avg)
    const cpuuti = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44880"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    //Load average (1m avg)
    const x1 = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44873"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    //last
    const last = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "item.get",
            params: {
                output: "extend",
                hostids: "10567",
                with_triggers: true,
                search: {
                    key_: "system.cpu"

                },
                sortfield: "name"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    //Load average (5m avg)
    const x5 = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44874"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    //Load average (15m avg)
    const x15 = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44848"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    const memoryav = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44900"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    const memoryavi = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44901"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    const totalspace = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44936"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    const usedspace = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44935"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    const spaceuti = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44937"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    const totalmemory = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44902"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    const freeswap = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44892"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));



    res.render('Ubuntu', { title: 'ztncui', data: { cpuuti, last, x1, x5, x15, totalmemory, memoryav, totalspace, usedspace, spaceuti, core, freeswap, memoryavi } });
});


router.get('/windows', async function(req, res, next) {
    const totalspace = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "45051"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    const usedspace = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "45050"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    const spaceuti = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "45052"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    const totalram = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "45008"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    const usedram = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "45009"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    const ramuti = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "45010"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    const cpuuti = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "44998"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    const cpulast = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "item.get",
            params: {
                output: "extend",
                hostids: "10567",
                with_triggers: true,
                search: {
                    key_: "system.cpu"

                },
                sortfield: "name"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    const freeswap = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "45003"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    const core = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "trend.get",
            params: {
                output: [
                    "itemid",
                    "clock",
                    "value_last",
                    "value_min",
                    "value_avg",
                    "value_max"
                ],
                itemids: [
                    "45011"
                ],
                limit: "1"
            },

            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76",
            id: 1

        })
        .then(data => (data.data))
        .catch(error => console.error(error));

    res.render('windows', { title: 'ztncui', data: { totalspace, usedspace, totalram, usedram, ramuti, spaceuti, cpuuti, cpulast, freeswap, core } });
});

router.get('/detail', guest_only, function(req, res, next) {
    res.render('detail', { title: 'ztncui' });
});

router.get('/detailubuntu', async function(req, res, next) {
    const detail = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "host.get",
            params: {
                selectInventory: true,
                selectItems: [
                    "name",
                    "lastvalue",
                    "units",
                    "itemid",
                    "lastclock",
                    "value_type",
                    "itemid"
                ],
                output: "extend",
                hostids: "10567",
                expandDescription: 1,
                expandData: 1
            },
            id: "1",
            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76"

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    res.render('detailubuntu', { title: 'ztncui', data: detail });
});

router.get('/detailwindows', async function(req, res, next) {
    const detail = await axios.post('http://172.20.10.4/api_jsonrpc.php', {
            jsonrpc: "2.0",
            method: "host.get",
            params: {
                selectInventory: true,
                selectItems: [
                    "name",
                    "lastvalue",
                    "units",
                    "itemid",
                    "lastclock",
                    "value_type",
                    "itemid"
                ],
                output: "extend",
                hostids: "10568",
                expandDescription: 1,
                expandData: 1
            },
            id: "1",
            auth: "d5d518dce9b21da4ad48b281fee212952ddd77f7e611d061b16e7e37a746ae76"

        })
        .then(data => (data.data))
        .catch(error => console.error(error));
    res.render('detailwindows', { title: 'ztncui', data: detail });
});

/* GET home page. */
router.get('/', guest_only, function(req, res, next) {
    res.render('front_door', { title: 'ztncui' });
});

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        res.redirect('/');
    });
});

router.get('/login', guest_only, function(req, res) {
    let message = null;
    if (req.session.error) {
        if (req.session.error !== 'Access denied!') {
            message = req.session.error;
        }
    } else {
        message = req.session.success;
    }
    res.render('login', { title: 'Login', message: message });
});

router.post('/login', async function(req, res) {
    await authenticate(req.body.username, req.body.password, function(err, user) {
        if (user) {
            req.session.regenerate(function() {
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.name;
                if (user.pass_set) {
                    res.redirect(req.query.redirect || '/controller/networks');
                } else {
                    res.redirect('/users/' + user.name + '/password');
                }
            });
        } else {
            req.session.error = 'Authentication failed, please check your username and password.'
            res.redirect('/login');
        }
    });
});
router.get('/iperf', async function(req, res, next) {
    async function fetchData() {
        const uri = "mongodb+srv://Pug:51347682@cluster0.mcrfprs.mongodb.net/?retryWrites=true&w=majority";
        const client = new MongoClient(uri);

        try {
            await client.connect();

            const database = client.db('iperf'); // Replace with your database name
            const collection = database.collection('status'); // Replace with your collection name

            // Fetch data from the collection
            const query = {}; // Replace with your query if needed
            const options = {}; // Replace with additional options if needed
            const result = await collection.find(query, options).toArray();

            return result; // Output the fetched data
        } catch (err) {
            console.error('Error occurred:', err);
        } finally {
            // Close the connection
            await client.close();
        }
    }
    const data = await fetchData();
    console.log(data[0])
    res.render('iperf', { title: 'ztncui', data: data });
});

router.get('/ping', async function(req, res, next) {
    var hosts = ['172.20.10.2', 'google.com', 'youtube.com'];
    let count = 0;
    const pingtest = async() => {
        let result = [];

        await Promise.all(
            hosts.map(function(host) {
                return ping.promise.probe(host)
                    .then(function(x) {
                        result.push(x);
                    });
            })
        );
        return result;
    }
    pingtest();
    const resultping = await pingtest()
    res.render('ping', { title: 'ztncui', result: resultping });
});

module.exports = router;