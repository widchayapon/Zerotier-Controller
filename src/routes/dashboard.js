const axios = require('axios'); // nodes
const express = require('express');
const auth = require('../controllers/auth');
const authenticate = auth.authenticate;
const restrict = auth.restrict;
const router = express.Router();
var ping = require('ping');
const { MongoClient, ServerApiVersion } = require('mongodb');

function verifyUser(req, res, next) {
    req.session.user ? next() : res.redirect('/login');

}
router.get('/', verifyUser, async function(req, res, next) {
    var hosts = ['172.20.10.2'];
    let count = 0;

    ////Ram total ไม่ได้ใช้ใส่มาเกิน
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

    //Ram use ไม่ได้ใช้ใส่มาเกิน
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

    //Ram in %
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
    //Cpu in %
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

    //Cpu in %
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

    //HDD in %
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

    //ping status
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

    //คนที่เชื่อมต่อกับระะทั้งหมด
    const users = await axios.post('http://172.20.10.4/api_jsonrpc.php', {

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
    const member = await axios.post('http://172.20.10.4/api_jsonrpc.php', {

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
    res.render('dashboard', { title: 'ztncui', data: { totalram, cpuuti, cpulast, ramuti, usedram, spaceuti, users, core, member, totalspace, usedspace }, result: resultping });
});
router.get('/loadingiperf', function(req, res, next) {
    res.render('loadingiperf', { title: 'ztncui' });
});
module.exports = router;