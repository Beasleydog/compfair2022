const fs = require("fs");
const path = require("path");

let picList = require("./pic.json");
console.log(picList);
function getPicData(id) {
  try {
    return picList.filter((x) => x.id == id)[0];
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
function getAllPic() {
  return Array.from(picList.pictures);
}

module.exports = {
  getPicData,
  getAllPic,
};
