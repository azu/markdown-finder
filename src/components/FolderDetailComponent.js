var React = require('react');
var readHead = require('head');
var fileutil = require('../file-utility');

var ListItemWrapper = React.createClass({
    render(){
        var item = this.props.item;
        var style = ( this.props.selected ? 'selected' : '' );
        var icon = ( item.isDirectory ? 'icon-folder' : 'icon-file' );
        //var date = fileutil.dateToString(item.mtime);
        if (item.isDirectory) {
            return (
                <li className={style + " item"}
                    onClick={this.props.onClick}
                    onKeyPress={this.props.onKeyPress}
                    onDoubleClick={this.props.onDoubleClick}
                    >
                    <span className="item-name"><i className={icon}></i> {item.name}</span>
                </li>
            );
        }
        return (
            <li className={style + " item"}
                onClick={this.props.onClick}
                onKeyPress={this.props.onKeyPress}
                onDoubleClick={this.props.onDoubleClick}
                >
                <span className="item-name"><i className={icon}></i> {item.name}</span>

                <p className="item-content">{readHead(item.path, 50).toString()}</p>
            </li>
        );
    }
});
/**
 * フォルダー内の詳細情報コンポーネントです。
 */
var FolderDetail = React.createClass({
    sortByTime(items){
        return items.sort(function (aItem, bItem) {
            return bItem.mtime - aItem.mtime;
        });
    },
    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render: function () {
        var items = this.sortByTime(this.props.items).map((item, index)=> {
            var selected = (item === this.props.currentItem);
            return (
                <ListItemWrapper key={item.path}
                                 item={item} selected={selected}
                                 onClick={this.onClickItem.bind( this, item )}
                                 onKeyPress={this.onKeyPress.bind(this,item,index)}
                                 onDoubleClick={this.onDoubleClickItem.bind( this, item )}
                    />
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
        console.log("item");
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
