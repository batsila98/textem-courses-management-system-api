const Log = require('../models/Log');

const addLog = async (req, res) => {
    const log = new Log(req.body);

    try {
        const logSaved = await log.save();
        res.json(logSaved);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const getLogs = async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    addLog,
    getLogs,
};