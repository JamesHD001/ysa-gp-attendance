const fs = require('fs');
const path = require('path');

const DEFAULT_FILE = path.join(__dirname, 'weekly.json');

let store = {
    weeks: {} // { "2025-01-06": { "userId": { status: "present", updatedAt: "ISO" } } }
};

function _ensureFile(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf8');
}

function load(filePath = DEFAULT_FILE) {
    _ensureFile(filePath);
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw || '{}');
        if (data && typeof data === 'object') {
            store = data;
        } else {
            store = { weeks: {} };
        }
        return store;
    } catch (err) {
        // If parse error or read error, reinitialize file synchronously
        store = { weeks: {} };
        fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf8');
        return store;
    }
}

function save(filePath = DEFAULT_FILE) {
    _ensureFile(filePath);
    fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf8');
    return true;
}

function getAll() {
    return store;
}

function getWeek(weekStartISO) {
    return store.weeks[weekStartISO] || {};
}

function setEntry(weekStartISO, userId, status) {
    if (!weekStartISO || !userId) throw new Error('weekStartISO and userId are required');
    if (!store.weeks[weekStartISO]) store.weeks[weekStartISO] = {};
    store.weeks[weekStartISO][userId] = {
        status,
        updatedAt: new Date().toISOString()
    };
    return store.weeks[weekStartISO][userId];
}

function removeEntry(weekStartISO, userId) {
    if (!store.weeks[weekStartISO]) return false;
    if (!store.weeks[weekStartISO][userId]) return false;
    delete store.weeks[weekStartISO][userId];
    if (Object.keys(store.weeks[weekStartISO]).length === 0) delete store.weeks[weekStartISO];
    return true;
}

function clearAll() {
    store = { weeks: {} };
    return store;
}

module.exports = {
    load,
    save,
    getAll,
    getWeek,
    setEntry,
    removeEntry,
    clearAll,
    DEFAULT_FILE
};