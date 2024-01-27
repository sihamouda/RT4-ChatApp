import { Friend } from "./friend";

export class User {
    constructor(public name='',public image='', public friends:Friend[]){}
}