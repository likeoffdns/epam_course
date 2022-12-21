import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

interface User {
    id: number,
    name: string,
    isDeleted: boolean,
}

let users: User[] = [
    { id: 1,
        name: 'Denys',
        isDeleted: false
    },
    { id: 2,
        name: 'Yevhen',
        isDeleted: false },
    { id: 3,
        name: 'Serhii',
        isDeleted: false }];

const userHandler = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));
    res.send(user ? user.name : 'dint found any');
};

const createUserHandler = (req: Request, res: Response) => {
    if (typeof req.body.id !== 'number') {
        throw new Error('testtest');
    } else {
        users.push(req.body);
    }
    res.send('successsss');
};

const updateUser = (req: Request, res: Response) => {
    const updatedUser: User = req.body;
    const updatedUserId  = Number(req.params.id);
    console.log(updatedUser, 'newUser');
    users = users.map((u) => {
        if (u.id === updatedUserId) {
            console.log({ ...u, updatedUser }, 'asdasdasd');
            return { ...u, ...updatedUser };
        }
        return u;
    });
    console.log(users);
    res.send(users[updatedUserId - 1]);
};

const getAllUsers = (req: Request, res: Response) => {
    const filteredUsers = users.filter((u) => !u.isDeleted); // move to util to use in getAutosuggest
    res.send(filteredUsers);
};

const getAutoSuggestUsers = (req: Request, res: Response) => {
    const substring = String(req.query.substring); // ask about cast types
    const limit = Number(req.query.limit);
    const result = users.map(u => {
        if (u.name.includes(substring)) return u;
    }).slice(0, limit);

    res.send(result);
};

const app: Express = express();
app.use(bodyParser.json());
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // todo ask about error handling
//     if (err) {
//         res.render('error', { error: err });
//     }
// });

const port = 3000;

app.get('/user/:id', userHandler);
app.get('/users', getAllUsers);
app.get('/users/autosuggest', getAutoSuggestUsers);
app.post('/user', createUserHandler);
app.put('/user/:id', updateUser);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
