const fs = require('fs')
const path = require('path');

function getLevelData(id) {
    try {
        const data = fs.readFileSync(path.join(__dirname, `/levelData/${id}.json`), 'utf8');
        console.log(data);
        return JSON.parse(data);
    }
    catch (e) {
        console.log(e);
        return undefined
    }
}

module.exports = {
    getLevelData
}