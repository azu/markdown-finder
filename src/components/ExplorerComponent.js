// LICENSE : MIT

"use strict";
var React = require('react');
import FolderTree from "./FolderTreeComponent.js"
import FolderDetail from "./FolderDetailComponent.js"
import PreviewContent from "./PreviewContentComponent.js"
class ExplorerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.context.explorerStore;
        this.action = props.context.explorerAction;
        this.state = {
            items: this.store.items,
            currentFolder: this.store.currentFolder,
            currentItem: this.store.currentItem
        }
    }

    componentDidMount() {
        this.store.onChange(this._onChange.bind(this))
    }

    _onChange() {
        this.setState({
            items: this.store.items,
            currentFolder: this.store.currentFolder,
            currentItem: this.store.currentItem
        });
    }

    componentWillUnmount() {
        this.store.removeAllChangeListeners();
    }

    onSelectFolder(folder) {
        this.action.selectFolder(folder);
    }

    onClickItem(item) {
        this.action.selectItem(item);
    }
    
    onKeyPress(item, index) {
        console.log(item, index);
    }

    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render() {
        return (
            <div className="Explorer l-flexbox">
                <div className="c-folder-tree">
                    <FolderTree name="HOME" path={this.state.currentFolder}
                                onSelectFolder={this.onSelectFolder.bind(this)}/>
                </div>
                <div className="c-folder-detail">
                    <FolderDetail items={this.state.items}
                                  currentItem={this.state.currentItem}
                                  onKeyPress={this.onKeyPress.bind(this)}
                                  onClickItem={this.onClickItem.bind(this)}/>
                </div>
                <div className="c-item-preview">
                    <PreviewContent item={this.state.currentItem}/>
                </div>
            </div>
        );
    }
}
export default ExplorerComponent;
