// LICENSE : MIT
"use strict";
import { Store } from 'flummox';
import Action from "../actions/ExploreAction.js"
import {getUserHomeDir} from "../file-utility.js"
class ExploreStore extends Store {
    constructor(flux) {
        super();
        var messageActionIds = flux.getActionIds('messages');
        this.register(messageActionIds.selectFolder, this.onSelectFolder);
        this.state = {
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

    onSelectFolder(state) {
        if (this.state.currentFolder === state.currentFolder) {
            return;
        }
        this.setState(state);
    }
}
export default ExploreStore;