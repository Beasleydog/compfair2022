//Import required modules
const fs = require('fs');
const path = require('path');

//Get list of all levels
let levelList = ["a", "b", "c", "d", "e", "f"];
levelList = levelList.map((x) => {
    return require(`./levelData/${x}.json`);
});

function getLevelData(id) {
    //Fetch data from id, return
    try {
        return levelList.filter((x) => x.id == id)[0];
    }
    catch (e) {
        console.log(e);
        return undefined
    }
}
function getAllLevels() {
    //Return all levels
    return levelList
}
function firstLevelName() {
    //Get name of first level
    let data = getLevelData(firstLevelId());
    return data.title;
}
function firstLevelId() {
    // Get id of first level
    return levelList[0].id
}

// Export functions
module.exports = {
    getLevelData,
    firstLevelName,
    firstLevelId,
    getAllLevels
}