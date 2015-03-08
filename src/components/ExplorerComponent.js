// LICENSE : MIT

"use strict";
var React = require('react');
import FolderTree from "./FolderTreeComponent.js"
import FolderDetail from "./FolderDetailComponent.js"
class ExplorerComponent extends React.Component {
    constructor(props) {
        super();
        this.store = props.flux.explorerStore;
        this.action = props.flux.explorerAction;
        this.state = {
            items: this.store.items,
            currentFolder: this.store.currentFolder
        }
    }

    componentDidMount() {
        this.store.addListener("change", this.onChange.bind(this))
    }

    onChange() {
        this.setState({
            items: this.store.items,
            currentFolder: this.store.currentFolder
        });
    }

    componentWillUnmount() {
        this.store.emitter.removeAllListeners("change");
    }

    onSelectFolder(folder) {
        console.log(this.props);
        this.action.selectFolder(folder);
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
                    <FolderTree name="HOME" path={this.state.currentFolder} onSelectFolder={this.onSelectFolder.bind(this)}/>
                </div>
                <div className="folder-detail">
                    <FolderDetail items={this.state.items} />
                </div>
            </div>
        );
    }
}
export default ExplorerComponent;