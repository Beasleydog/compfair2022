Define fs to require("fs");
Define path to require("path");

Get data from "pic.json"

function getPicData(Parameter type, Parameter id) {
  Return picture in "pic.json" of same type and id
  If exception is thrown:
    Return undefined
}

function getAllBottomPic() {
  Return all pictures of type bottom
}
function getAllMidPic() {
  Return all pictures of type mid
}
function getAllTopPic() {
  return all pictures of type top
}

module.exports = {
  getPicData,
  getAllBottomPic,
  getAllMidPic,
  getAllTopPic,
};
