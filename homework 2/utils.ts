import { User } from './db/types/user';

const findUserById = (users: User[], id: string) => users.find((u) => u.id === id);

const updateUser = (users: User[], updatedUser: User, updatedUserId: string) => {
    return users.map((u) => {
        if (u.id === updatedUserId) {
            return { ...u, ...updatedUser };
        }
        return u;
    });
};

const filterUserByDeletedFlag = (users: User[]) => users.filter((u) => !u.isDeleted);

const getAutoSuggestions = (users: User[], substring: string, limit: number) => {
    return users.map(u => {
        if (u.login.includes(substring)) return u;
    }).filter(u => u).slice(0, limit);
};

const softDeleteUser = (users: User[], deletedUserId: string) => {
    return users.map((u) => {
        if (u.id === deletedUserId) {
            return { ...u, isDeleted: true };
        }
        return u;
    });
};

export {
    findUserById,
    updateUser,
    filterUserByDeletedFlag,
    getAutoSuggestions,
    softDeleteUser
};
