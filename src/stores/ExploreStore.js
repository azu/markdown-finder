// LICENSE : MIT
"use strict";
import { Store } from 'material-flux';
import { keys } from "../actions/ExploreAction.js"
import {getUserHomeDir} from "../file-utility.js"
class ExploreStore extends Store {
    constructor(flux) {
        super(flux);
        this.register(keys.selectFolder, this.onSelectFolder);
        this.register(keys.selectItem, this.onSelectItem);
        this.state = {
            currentItem: null,
            items: [],
            currentFolder: getUserHomeDir()
        };
    }

    get currentFolder() {
        return this.state.currentFolder;
    }

    get items() {
        return this.state.items;
    }

    get currentItem() {
        return this.state.currentItem;
    }


    onSelectFolder(state) {
        if (this.state.currentFolder === state.currentFolder) {
            return;
        }
        this.setState(state);
    }

    onSelectItem(item) {
        this.setState({
            currentItem: item
        });
    }
}
export default ExploreStore;