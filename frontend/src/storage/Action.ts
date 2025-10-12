import {Action as ReduxAction} from "redux";

export default interface AppAction<T> extends ReduxAction{
    payload: T
}