var React = require('react');

/**
 * フォルダー内の詳細情報コンポーネントです。
 */
var FolderDetail = React.createClass({
    sortByTime(items){
        return this.props.items.sort(function (aItem, bItem) {
            return bItem.mtime - aItem.mtime;
        });
    },
    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function () {
        var fileutil = require('../file-utility');
        var items = this.sortByTime(this.props.items).map((item, index)=> {
            var style = ( item === this.props.currentItem ? 'selected' : '' );
            var icon = ( item.isDirectory ? 'icon-folder' : 'icon-file' );
            var type = fileutil.getItemType(item);
            var size = fileutil.bytesToSize(item.size);
            //var mode = fileutil.getPermissionString(item.mode, item.isDirectory);
            var date = fileutil.dateToString(item.mtime);
            return (
                <tr
                    key={index}
                    className={style}
                    tabIndex={index}
                    onClick={this.onClickItem.bind( this, item )}
                    onKeyPress={this.onKeyPress.bind(this,item,index)}
                    onDoubleClick={this.onDoubleClickItem.bind( this, item )}>
                    <td><i className={icon}></i> {item.name}</td>
                    <td>{date}</td>
                    <td>{type}</td>
                    <td>{size}</td>
                </tr>
            );
        }, this);

        return (
            <div className="FolderDetail">
                <table className="items">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Modified</th>
                        <th>Type</th>
                        <th>Size</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </table>
            </div>
        );
    },
    /**
     * アイテムがクリックされた時に発生します。
     *
     * @param {Object} item アイテム情報。
     */
    onClickItem: function (item) {
        this.props.onClickItem(item);
    },
    onKeyPress: function (item, index) {
        this.props.onKeyPress(item, index);
    },
    /**
     * アイテムがダブル クリックされた時に発生します。
     *
     * @param {Object} item アイテム情報。
     */
    onDoubleClickItem: function (item) {
        if (item.isDirectory) {
            // ここでフォルダ ツリーに変更通知して展開させたい

        } else {
            var fileutil = require('../file-utility');
            fileutil.shellOpenItem(item.path);
        }
    }
});

module.exports = FolderDetail;
