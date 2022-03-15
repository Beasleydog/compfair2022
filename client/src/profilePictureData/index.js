const fs = require("fs");
const path = require("path");

let picList = require("./pic.json");
console.log(picList);
function getPicData(id) {
  const pictures = picList.pictures;
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
function getPicIDFromSRC(src) {
  const pictures = picList.pictures;
  try {
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].src == src) {
        return pictures[i].id;
      }
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
function getAllBottomPic() {
  const arr1 = picList.pictures;
  let arr2 = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].type == 0) {
      arr2.push(arr1[i]);
    }
  }
  return arr2;
}
function getAllMidPic() {
  const arr1 = picList.pictures;
  let arr2 = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].type == 1) {
      arr2.push(arr1[i]);
    }
  }
  return arr2;
}
function getAllTopPic() {
  const arr1 = picList.pictures;
  let arr2 = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].type == 2) {
      arr2.push(arr1[i]);
    }
  }
  return arr2;
}

module.exports = {
  getPicData,
  getAllBottomPic,
  getAllMidPic,
  getAllTopPic,
  getPicIDFromSRC,
};
