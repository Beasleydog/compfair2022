Define fs to require('fs');
Define path to require('path');

Define levelList to ["a", "b", "c", "d"];
Set levelList to levelList.map((x) => {
    return require(`./levelData/${x}.json`);
});

function getLevelData(id) {
    Return levelList.filter((x) => x.id == id)[0];
    If exception is thrown:
        Return undefined
}

function getAllLevels() {
    Return levelList
}
function firstLevelName() {
    Define data to getLevelData(firstLevelId());
    Return title from data;
}

function firstLevelId() {
    Return id from first element of levelList
}

module.exports = {
    getLevelData,
    firstLevelName,
    firstLevelId,
    getAllLevels
}