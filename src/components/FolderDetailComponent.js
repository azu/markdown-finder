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
        var readHead = require('head');
        var fileutil = require('../file-utility');
        var items = this.sortByTime(this.props.items).map((item, index)=> {
            var style = ( item === this.props.currentItem ? 'selected' : '' );
            var icon = ( item.isDirectory ? 'icon-folder' : 'icon-file' );
            //var type = fileutil.getItemType(item);
            //var size = fileutil.bytesToSize(item.size);
            //var mode = fileutil.getPermissionString(item.mode, item.isDirectory);
            //var date = fileutil.dateToString(item.mtime);
            if (item.isDirectory) {
                return (
                    <li
                        key={item.name}
                        className={style + " item"}
                        tabIndex={index}
                        onClick={this.onClickItem.bind( this, item )}
                        onKeyPress={this.onKeyPress.bind(this,item,index)}
                        onDoubleClick={this.onDoubleClickItem.bind( this, item )}>
                        <span className="item-name"><i className={icon}></i> {item.name}</span>
                    </li>
                );
            }
            return (
                <li
                    key={item.name}
                    className={style + " item"}
                    tabIndex={index}
                    onClick={this.onClickItem.bind( this, item )}
                    onKeyPress={this.onKeyPress.bind(this,item,index)}
                    onDoubleClick={this.onDoubleClickItem.bind( this, item )}>
                    <span className="item-name"><i className={icon}></i> {item.name}</span>
                    <p className="item-content">{readHead(item.path, 50).toString()}</p>
                </li>
            );
        }, this);
        return (
            <div className="FolderDetail">
                <header className="items-header">
                    <span>Name</span>
                </header>
                <ul className="items">
                    {items}
                </ul>
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
