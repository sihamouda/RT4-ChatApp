import { Message } from "./Model/Message";
import { Team } from "./Model/Team";
import { User } from "./Model/User";
import { Friend } from "./Model/friend";

const discussion:Message[] = [
    new Message(false,"Your message goes here ...."),
    new Message(true,"Your message goes here ...."),
    new Message(true,"Your message goes here ...."),
    new Message(false,"Your message goes here ...."),
    new Message(false,"Your message goes here ...."),
  ]

  const discussion2:Message[] = [
    new Message(false,"Hi from new york"),
    new Message(true,"Hi from Paris"),
    new Message(true,"Hi from Hay elkhadhra"),
  ]
  
  const friends:Friend[]=[
    new Friend("Khaldoun TAKTAK",'khaldoun.png',true,discussion),
    new Friend("Anis Hammouda","anis.png",false,discussion),
    new Friend("Oussema Chaouachi","chaouachi.png",true,discussion),
    new Friend("Adame Dey","dey.png",true,discussion),
  ]

  const friends2:Friend[]=[
    new Friend("Khaldoun TAKTAK",'khaldoun.png',true,discussion2),
    new Friend("Ahmed Rjiba","rjiba.png",true,discussion2),
    new Friend("Oussema Chaouachi","chaouachi.png",true,discussion2),
    new Friend("Adame Dey","dey.png",true,discussion2),
  ]


export const users:User[]=[
    new User("Ahmed Rjiba","rjiba.png",friends),
    new User("Anis Hammouda","anis.png",friends2)
]  

export const Teams:Team[] = [
    new Team ("#8A91D7","G","Rjiba"),
    new Team ("#C76DD6","S","Rjiba"),
    new Team ("#78D0B0","D","Rjiba"),
    new Team ("#E1D094","F","Rjiba"),
    new Team ("#E8A179","R","Rjiba"),
  ]
