
export class Task{
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
}

export const TASKEMPTY: Task = {
    taskId: 0,
    title: "",
    description: "",
    priority: 0,
    isCompleted: false,
    isDeleted: false,
    createDate: "",
    updateDate: "",
    userId: 0,
    categoryId: 0
};