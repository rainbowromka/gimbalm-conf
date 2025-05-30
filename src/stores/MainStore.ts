import { makeObservable, observable } from "mobx";

export default class MainStore {

    count: number = 1;

    constructor()
    {
        makeObservable(this, {
            count: observable
        });
    }
}