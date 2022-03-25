//Import required modules
const fs = require("fs");
const path = require("path");

//Get list of all pictures
let picList = require("./pic.json");

function getPicData(type, id) {
  // Get data from type and ID
  const pictures = picList[type];
  try {
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].id == id) {
        //Return picture
        return pictures[i];
      }
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function getAllBottomPic() {
  // Return all bottom pics
  return picList.bottom;
}
function getAllMidPic() {
  // Return all middle pics
  return picList.mid;
}
function getAllTopPic() {
  // Return all top pics
  return picList.top;
}

// Export functions
module.exports = {
  getPicData,
  getAllBottomPic,
  getAllMidPic,
  getAllTopPic,
};
