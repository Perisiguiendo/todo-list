import { computed, observable } from "mobx";
import {
  applySnapshot,
  getSnapshot,
  model,
  Model,
  modelAction,
  ModelCreationData,
  ModelData,
  onPatches,
  prop,
  registerRootStore,
  setGlobalConfig,
  SnapshotOutOf,
  SnapshotOutOfModel,
  UndoManager,
  undoMiddleware,
  withoutUndo,
} from "mobx-keystone";
import { Context, createContext, useContext } from "react";

export type toDoType = 'DONE' | 'TODO';

export type types = toDoType | '__ALL__';

export const toDoTypeMap = {
  DONE: 'DONE' as toDoType,
  TODO: 'TODO' as toDoType,
  ALL: '__ALL__' as types,
}

export interface ToDoItemProps {
  id: string;
  content: string;
  type: toDoType;
}

const LOCAL_KEY = 'todo-list-test-oliverpeng';

@model("ToDoList")
export class ToDoList extends Model({}) {
  @observable
  public toDoList: ToDoItemProps[] = [];

  @observable
  public expand: Boolean = false;

  @observable
  public showType: types = toDoTypeMap.ALL;

  @modelAction
  public changeShowType(type: types) {
    this.showType = type;
  }

  @modelAction
  public addItem(item: ToDoItemProps) {
    this.toDoList.push(item);
    this.save();
  }

  @modelAction
  public deleteItem(id: string) {
    this.toDoList = [...this.toDoList.filter(v => v.id === id)];
    this.save();
  }

  @modelAction
  public transformStatus(item: ToDoItemProps) {
    const index = this.toDoList.findIndex(v => v.id === item.id);
    this.toDoList[index].type = item.type === toDoTypeMap.DONE ? toDoTypeMap.TODO : toDoTypeMap.DONE;
    this.save();
  }

  @modelAction
  public clearAllItem() {
    this.toDoList = [];
    this.save();
  }

  @modelAction
  public changeExpand(sign?: boolean) {
    this.expand = sign && (typeof sign) === "boolean" ? sign : !this.expand;
  }

  public init() {
    try {
      const list = localStorage.getItem(LOCAL_KEY);
      if(!list) return;
      this.toDoList = JSON.parse(list);
    } catch (error) {
      console.error("初始化失败")
    }
  }

  public save() {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(this.toDoList));
    } catch (error) {
      console.error("保存失败")
    }
  }

  public getList(type?: types) {
    if(type) {
      return this.toDoList.filter(v => v.type === type);
    }
    
    return this.showType in [toDoTypeMap.DONE, toDoTypeMap.TODO] ? this.toDoList.filter(v => v.type === this.showType) : this.toDoList;
  }

  public getToDoItemLens(): number {    
    return this.getList(toDoTypeMap.TODO)?.length || 0;
  }
}

export function createToDoListStore(): ToDoList {
  const store = new ToDoList({});
  registerRootStore(store);
  return store;
}

let rootStore: ToDoList | null = null;
export function getToDoListStore(): ToDoList {
  if(!rootStore) {
    rootStore = createToDoListStore();
  }
  return rootStore;
}

export const StoreContext = createContext<ToDoList | null>(null) as Context<ToDoList>;

export function useStore() {
  const store = useContext(StoreContext);
  if(!store) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

export type StoreSnapshot = SnapshotOutOfModel<ToDoList>;
export type StoreCreationData = ModelCreationData<ToDoList>;
export type StoreData = ModelData<ToDoList>;