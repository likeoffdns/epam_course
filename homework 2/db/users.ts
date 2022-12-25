import { User } from './types/user';
import { v4 as uuid4 } from 'uuid';

export const users: User[] = [
    { id: uuid4(),
        login: 'Denys',
        password: 'qwe123',
        age: 24,
        isDeleted: false
    },
    { id: uuid4(),
        login: 'Yevhen',
        age: 40,
        password: 'password',
        isDeleted: false },
    { id: uuid4(),
        login: 'Serhii',
        age: 50,
        password: 'password2',
        isDeleted: false }];


export const database = {
    users
};
