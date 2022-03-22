const fs = require("fs");
const path = require("path");

let picList = require("./pic.json");
console.log(picList);
function getPicData(type, id) {
  const pictures = picList[type];
  try {
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].id == id) {
        return pictures[i];
      }
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function getAllBottomPic() {
  return picList.bottom;
}
function getAllMidPic() {
  return picList.mid;
}
function getAllTopPic() {
  return picList.top;
}

module.exports = {
  getPicData,
  getAllBottomPic,
  getAllMidPic,
  getAllTopPic,
};
