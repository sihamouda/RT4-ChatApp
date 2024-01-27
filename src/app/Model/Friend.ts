import { Message } from "./Message";

export class Friend {
    constructor(public name='',public image='',public active:boolean,public discussion:Message[]){}
}