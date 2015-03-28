/**
 * アイテム情報を生成します。
 *
 * @param {String} folderPath 親フォルダのパス。
 * @param {String} name       アイテム名。
 *
 * @return {Object} アイテム情報。
 */
function createItem(folderPath, name) {
    if (name.lastIndexOf('.', 0) === 0) {
        return null;
    }

    var path = folderPath + name;
    var stat = fs.statSync(path);
    var isDirectory = stat.isDirectory();
    if (!( withFiles || isDirectory )) {
        return null;
    }

    return {
        name: name,
        path: path,
        size: stat.size,
        mtime: stat.mtime,
        isDirectory: isDirectory
    };
}

module.exports = {
    /**
     * フォルダ内のアイテムを列挙します。
     *
     * @param {String}   folderPath フォルダのパス。
     * @param {Function} onEnd      フォルダを列挙し終えたことを通知するコールバック関数。
     * @param {Boolean}  withFiles  ファイルも列挙する場合は true。既定はフォルダのみ。
     */
    enumItemsAtFolder: function (folderPath, onEnd, withFiles) {
        folderPath += '/';

        var fs = require('fs');
        fs.readdir(folderPath, function (err, names) {
            if (err) {
                console.log(err);
                onEnd([]);
                return;
            }

            var items = [];
            names.forEach(function (name, index) {
                function createItem() {
                    if (name.lastIndexOf('.', 0) === 0) {
                        return null;
                    }

                    var path = folderPath + name;
                    try {
                        var stat = fs.statSync(path);
                    } catch (e) {
                        return;
                    }
                    var isDirectory = stat.isDirectory();
                    if (!( withFiles || isDirectory )) {
                        return null;
                    }

                    return {
                        name: name,
                        path: path,
                        size: stat.size,
                        mode: stat.mode,
                        mtime: stat.mtime,
                        isDirectory: isDirectory
                    };
                }

                var item = createItem();
                if (item) {
                    items.push(item);
                }

                if (index === names.length - 1) {
                    onEnd(items);
                }
            });
        });
    },
    /**
     * バイト数を単位付き文字列に変換します。
     *
     * @param {Number} bytes ファイル サイズ。
     *
     * @return {String} 単位付きのファイル サイズ文字列。TB を超えるサイズの場合は '--' を返します。
     */
    bytesToSize: function (bytes) {
        if (bytes === 0) {
            return '--';
        }

        var k = 1024;
        var units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        var unit = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));
        var size = ( bytes / Math.pow(k, unit) ) * 10;

        return ( Math.ceil(size) / 10 ) + ' ' + units[unit];
    },
    /**
     * 日時情報を文字列化します。
     *
     * @param {Date} date 日時情報。
     *
     * @return {String} 文字列。
     */
    dateToString: function (date) {
        return ( date && date.toLocaleDateString ? date.toLocaleDateString() : '' );
    },
    /**
     * アイテム種別を取得します。
     *
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    getItemType: function (item) {
        if (item.isDirectory) {
            return 'Folder';
        }

        var path = require('path');
        var ext = path.extname(item.path);
        switch (ext) {
            case '.txt':
                return 'Text';
            case '.md':
                return 'Markdown';
            case '.html':
                return 'HTML';
            case '.css':
                return 'Style Sheet';
            case '.js':
                return 'JavaScript';
            case '.jpeg':
                return 'JPEG';
            case '.png':
                return 'PNG';
            case '.gif':
                return 'GIF';
            case '.mp3':
                return 'MPEG3';
            case '.mp4':
                return 'MPEG4';
            case '.aac':
                return 'AAC';
            default:
                return 'File';
        }
    },

    /**
     * ユーザーのホームディレクトリを取得します。
     * http://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
     *
     * @return {String} ホームディレクトリのパス。
     */
    getUserHomeDir: function () {
        return process.env[( process.platform == 'win32' ) ? 'USERPROFILE' : 'HOME'] + "/Dropbox/Memo";
    },
    /**
     * パーミッションを示す数値から記号化された文字列を取得します。
     *
     * @param {Number} mode モード。
     * @param isDirectory
     * @return {String} パーミッション表記の文字列。
     */
    getPermissionString: function (mode, isDirectory) {
        var S_IRUSR = 0x0400;
        var S_IWUSR = 0x0200;
        var S_IXUSR = 0x0100;
        var S_IRGRP = 0x0040;
        var S_IWGRP = 0x0020;
        var S_IXGRP = 0x0010;
        var S_IROTH = 0x0004;
        var S_IWOTH = 0x0002;
        var S_IXOTH = 0x0001;

        var str =
            ( isDirectory ? 'd' : '-' ) +
            ( mode & S_IRUSR ? 'r' : '-' ) +
            ( mode & S_IWUSR ? 'w' : '-' ) +
            ( mode & S_IXUSR ? 'x' : '-' ) +
            ( mode & S_IRGRP ? 'r' : '-' ) +
            ( mode & S_IWGRP ? 'w' : '-' ) +
            ( mode & S_IXGRP ? 'x' : '-' ) +
            ( mode & S_IROTH ? 'r' : '-' ) +
            ( mode & S_IWOTH ? 'w' : '-' ) +
            ( mode & S_IXOTH ? 'x' : '-' );

        return str;
    },
    shellOpenItem: function (path) {
        var gui = window.require('nw.gui');
        gui.Shell.openItem(path);
    }
};
