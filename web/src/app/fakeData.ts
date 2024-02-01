import { Conversation } from './Model/Conversation';
import { DisplayMessage as Message } from './Model/DisplayMessage';
import { Team } from './Model/Team';
import { Friend } from './Model/friend';
import { User } from './Model/User';

export const discussion: Message[] = [
  new Message(false, 'Your message goes here ....'),
  new Message(true, 'Your message goes here ....'),
  new Message(true, 'Your message goes here ....'),
  new Message(false, 'Your message goes here ....'),
  new Message(false, 'Your message goes here ....'),
];

const discussion2: Message[] = [
  new Message(false, 'Hi from new york'),
  new Message(true, 'Hi from Paris'),
  new Message(true, 'Hi from Hay elkhadhra'),
];

let conversation!: Conversation;

const friends: Friend = new Friend(
  '',
  'Khaldoun',
  'TAKTAK',
  'khaldoun.png',
  true,
  discussion,
  conversation
);

const friends2: Friend[] = [
  new Friend(
    '',
    'Khaldoun',
    'TAKTAK',
    'khaldoun.png',
    true,
    discussion2,
    conversation
  ),
  new Friend(
    '',
    'Ahmed',
    'Rjiba',
    'rjiba.png',
    true,
    discussion2,
    conversation
  ),
  new Friend(
    '',
    'Oussema',
    'Chaouachi',
    'chaouachi.png',
    true,
    discussion2,
    conversation
  ),
  new Friend('', 'Adame', 'Dey', 'dey.png', true, discussion2, conversation),
];

export const users: User[] = [
  new User('', 'Ahmed', 'Rjiba', 'rjiba.png', '', '', friends2),
  new User('', 'Anis', 'Hammouda', 'anis.png', '', '', friends2),
];

export const Teams: Team[] = [
  new Team('#8A91D7', 'P', 'Projet Web'),
  new Team('#C76DD6', 'R', 'RT4'),
  new Team('#78D0B0', 'C', 'Chats'),
  new Team('#E1D094', 'C', 'Club'),
  new Team('#E8A179', 'I', 'IEEE'),
];
