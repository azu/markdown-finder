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
        this.register(keys.deleteItem, this.onDeleteItem);
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


    onDeleteItem(item){
        if(this.currentItem === item) {
            this.setState({
                currentItem: null
            });
        }
    }
    onSelectFolder(state) {
        this.setState(state);
    }

    onSelectItem(item) {
        this.setState({
            currentItem: item
        });
    }
}
export default ExploreStore;