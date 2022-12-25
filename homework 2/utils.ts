import { User } from './db/types/user';

const findUserById = (users: User[], id:string) => users.find((u) => u.id === id);

const updateUser = (users: User[], updatedUser: User, updatedUserId: string) => {
    const test =  users.map((u) => {
        if (u.id === updatedUserId) {
            return { ...u, ...updatedUser };
        }
        return u;
    });
    console.log(test, 'asdasd');
    return test;
};

const filterUserByDeletedFlag = (users: User[]) => users.filter((u) => !u.isDeleted);

const getAutoSuggestions = (users: User[], substring: string, limit: number) => {
    return users.map(u => {
        if (u.login.includes(substring)) return u;
    }).filter(u => u).slice(0, limit);
};

export {
    findUserById,
    updateUser,
    filterUserByDeletedFlag,
    getAutoSuggestions
};
