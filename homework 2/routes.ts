import { Router } from 'express';
import {
    updateUser,
    getUserById,
    getAllUsers,
    getAutoSuggestUsers,
    createUserHandler
} from './handlers/users';


export const router = Router();


router.get('/user/:id', getUserById);
router.get('/users', getAllUsers);
router.get('/users/autosuggest', getAutoSuggestUsers);
router.post('/user', createUserHandler);
router.put('/user/:id', updateUser);
