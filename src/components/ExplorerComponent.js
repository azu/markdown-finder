// LICENSE : MIT

"use strict";
var React = require('react');
import FolderTree from "./FolderTreeComponent.js"
import FolderDetail from "./FolderDetailComponent.js"
import PreviewContent from "./PreviewContentComponent.js"
class ExplorerComponent extends React.Component {
    constructor(props) {
        super();
        this.store = props.flux.explorerStore;
        this.action = props.flux.explorerAction;
        this.state = {
            items: this.store.items,
            currentFolder: this.store.currentFolder,
            currentItem: this.store.currentItem
        }
    }

    componentDidMount() {
        this.store.addListener("change", this.onChange.bind(this))
    }

    onChange() {
        this.setState({
            items: this.store.items,
            currentFolder: this.store.currentFolder,
            currentItem: this.store.currentItem
        });
    }

    componentWillUnmount() {
        this.store.emitter.removeAllListeners("change");
    }

    onSelectFolder(folder) {
        this.action.selectFolder(folder);
    }

    onClickItem(item) {
        this.action.selectItem(item);
    }

    /**
     * コンポーネントの描画オブジェクトを取得します。
     *
     * @return {Object} 描画オブジェクト。
     */
    render() {
        return (
            <div className="explorer">
                <div className="folder-tree">
                    <FolderTree name="HOME" path={this.state.currentFolder}
                                onSelectFolder={this.onSelectFolder.bind(this)}/>
                </div>
                <div className="detail-column">
                    <div className="folder-detail">
                        <FolderDetail items={this.state.items}
                                      currentItem={this.state.currentItem}
                                      onClickItem={this.onClickItem.bind(this)}/>
                    </div>
                    <div className="item-preview">
                        <PreviewContent item={this.state.currentItem}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default ExplorerComponent;