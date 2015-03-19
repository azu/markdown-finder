var React = require('react');

/**
 * フォルダー内の詳細情報コンポーネントです。
 */
var FolderDetail = React.createClass({
    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function () {
        var fileutil = require('../file-utility');
        var items = this.props.items.map((item, index)=> {
            var style = ( item === this.props.currentItem ? 'selected' : '' );
            var icon = ( item.isDirectory ? 'icon-folder' : 'icon-file' );
            var type = fileutil.getItemType(item);
            var size = fileutil.bytesToSize(item.size);
            var mode = fileutil.getPermissionString(item.mode, item.isDirectory);
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
                    <td>{type}</td>
                    <td>{size}</td>
                    <td>{mode}</td>
                    <td>{date}</td>
                </tr>
            );
        }, this);

        return (
            <table className="items">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Permission</th>
                    <th>Modified</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
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
    onKeyPress: function(item, index){
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
