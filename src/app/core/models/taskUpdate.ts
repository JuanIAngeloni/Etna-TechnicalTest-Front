import { CATEGORYEMPTY, Category } from "./category";

export class TaskUpdate{
    taskId:number = 0;
    title: string = "";
    description: string = "";
    priority : number = 0;
    isCompleted: boolean = false;
    isDeleted: boolean = false;
    createDate : string = "";
    updateDate : string =  "";
    userId : number = 0;
    categoryId : number = 0;
    category : Category = CATEGORYEMPTY;
}

export const TASKUPDATEEMPTY: TaskUpdate = {
    taskId: 0,
    title: "",
    description: "",
    priority: 0,
    isCompleted: false,
    isDeleted: false,
    createDate: "",
    updateDate: "",
    userId: 0,
    categoryId: 0,
    category : CATEGORYEMPTY,
};