import { computed, observable } from "mobx";
import {
  getSnapshot,
  model,
  Model,
  modelAction,
  ModelCreationData,
  ModelData,
  registerRootStore,
  SnapshotOutOfModel,
} from "mobx-keystone";
import { message } from 'antd';
import { Context, createContext, useContext } from "react";

export type toDoType = 'DONE' | 'TODO';

export const __ALL__ = '__ALL__';

export const toDoTypeMap = {
  DONE: 'DONE' as toDoType,
  TODO: 'TODO' as toDoType,
}

export interface ToDoItemProps {
  id: string;
  content: string;
  type: toDoType;
}

const LOCAL_KEY = 'todo-list-test-oliverpeng';

@model("ToDoList")
export class ToDoList extends Model({}) {
  constructor(el: any) {
    super(el);
    this.init();
  }

  @observable
  public toDoList: ToDoItemProps[] = [];

  @observable
  public expand: Boolean = false;

  @observable
  public showType: toDoType | String = __ALL__;

  @modelAction
  public changeShowType(type: toDoType | String) {
    this.showType = type;
  }

  @modelAction
  public addItem(item: ToDoItemProps) {
    this.toDoList.push(item);
    this.save();
    message.success("添加成功");
  }

  @modelAction
  public deleteItem(id: string) {
    this.toDoList = [...this.toDoList.filter(v => v.id !== id)];
    this.save();
    message.success("删除成功");
  }

  @modelAction
  public transformStatus(item: ToDoItemProps) {
    const index = this.toDoList.findIndex(v => v.id === item.id);
    this.toDoList[index].type = item.type === toDoTypeMap.DONE ? toDoTypeMap.TODO : toDoTypeMap.DONE;
    this.save();
  }

  @modelAction
  public clearDoneItem() {
    this.toDoList = [...this.toDoList.filter(v => v.type === toDoTypeMap.TODO)];
    this.save();
    message.success("删除成功");
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
      console.error("初始化失败");
    }
  }

  public save() {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(this.toDoList));
    } catch (error) {
      message.error("保存失败");
    }
  }

  public modify(item: ToDoItemProps, text: string) {
    const index = this.toDoList.findIndex(v => v.id === item.id);
    this.toDoList.splice(index, 1, {
      ...item,
      content: text,
    })
  }

  @computed
  get getList() {
    return this.showType === __ALL__ ? this.toDoList : this.toDoList.filter(v => v.type === this.showType);
  }

  @computed
  get toDoItemLens(): number {    
    return this.toDoList.filter(v => v.type === toDoTypeMap.TODO)?.length || 0;
  }

  @computed
  get doneItemLens(): number {    
    return this.toDoList.filter(v => v.type === toDoTypeMap.DONE)?.length || 0;
  }

  public getToDoListSnapshot() {
    const todoSnapshot = getSnapshot(this);
    console.log('todoSnapshot', todoSnapshot);
    
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