// LICENSE : MIT
"use strict";
import { Action } from 'material-flux';
import utils  from '../utils/ExploreUtils.js';
/**
 * フォルダ詳細を更新します。
 *
 * @param  {String} directoryPath 新たに選択されたフォルダ。
 */
function getItemInDirectoryAsync(directoryPath) {
    var fileUtil = require('../file-utility');
    return new Promise(function (resolve) {
        fileUtil.enumItemsAtFolder(directoryPath, function (items) {
            items.sort(function (a, b) {
                return (
                    a.isDirectory === b.isDirectory
                        ? a.name.localeCompare(b.name)
                        : a.isDirectory );
            });
            resolve(items);
        }, true);
    });
}


export var keys = {
    selectFolder: Symbol("selectFolder"),
    deleteItem: Symbol("deleteItem"),
    selectItem: Symbol("selectItem")
};
class ExploreAction extends Action {
    createNewNote(directoryPath) {
        if (utils.createNewNote(directoryPath)) {
            // reload
            this.selectFolder(directoryPath);
        }
    }

    deleteItem(item, directoryPath) {
        if (utils.deleteNote(item)) {

            // reload
            this.selectFolder(directoryPath);
        }
    }

    selectFolder(directoryPath) {
        getItemInDirectoryAsync(directoryPath).then((items)=> {
            this.dispatch(keys.selectFolder, {
                currentItem: null,
                items: items,
                currentFolder: directoryPath
            });
        });
    }

    selectItem(item) {
        this.dispatch(keys.selectItem, item);
    }
}
export default ExploreAction;