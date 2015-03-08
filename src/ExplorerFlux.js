// LICENSE : MIT
"use strict";
import ExplorerAction from "./actions/ExploreAction.js"
import ExplorerStore from "./stores/ExploreStore.js"
import { Flux } from 'flummox';

class ExplorerFlux extends Flux {
    constructor() {
        super();
        this.createActions('messages', ExplorerAction);
        this.createStore('messages', ExplorerStore, this);
    }
    get explorerAction(){
        return this.getActions("messages");
    }
    get explorerStore(){
        return this.getStore("messages");
    }
}
export default ExplorerFlux;