const fs = require('fs');
const path = require('path');

let levelList = ["a", "b"];
levelList = levelList.map((x) => {
    return require(`./levelData/${x}.json`);
});
console.log(levelList)
function getLevelData(id) {
    try {
        return levelList.filter((x) => x.id == id)[0];
    }
    catch (e) {
        console.log(e);
        return undefined
    }
}
function getAllLevels() {
    return levelList
}
function firstLevelName() {
    let data = getLevelData(firstLevelId());
    return data.title;
}
function firstLevelId() {
    return levelList[0].id
}
module.exports = {
    getLevelData,
    firstLevelName,
    firstLevelId,
    getAllLevels
}