// LICENSE : MIT
"use strict";
import { Actions } from 'flummox';
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
class ExploreAction extends Actions {
    async selectFolder(directoryPath) {
        return getItemInDirectoryAsync(directoryPath).then((items)=> {
            return {
                items: items,
                currentFolder: directoryPath
            }
        });
    }
}
export default ExploreAction;