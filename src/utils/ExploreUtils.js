// LICENSE : MIT
"use strict";
var fs = require("fs-extra");
var path = require("path");
function createNewNote(directoryPath) {
    var title = window.prompt("Create New Note Title:", "");
    if (title == null || title.length === 0) {
        return false;
    }
    var filePath = path.join(directoryPath, title + ".md");
    try {
        fs.writeFileSync(filePath, `# ${title}`);
    } catch (error) {
        console.log("Write Error: ", error);
        return false;
    }
    return true;
}

/**
 * delete, if success return true
 * @param item
 */
function deleteNote(item) {
    fs.removeSync(item.path);
    return true;
}
module.exports = {
    createNewNote,
    deleteNote
};