const expect = require('expect');
const { Users } = require('./users');
describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Anil1",
            room: "The Office of SAY Team1"
        },
        {
            id: "2",
            name: "Anil2",
            room: "The Office of SAY Team1"
        },
        {
            id: "3",
            name: "Anil3",
            room: "The Office of SAY Team3"
        },
        ]
    })

    it('should add new user', () => {
        let users = new Users()
        let user =
        {
            id: "frfrfr4",
            name: "Anil",
            room: "The Office of SAY Team"
        };
        let reUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([reUser]);
    })
    it('should retun names for The Office of SAY Team1', () => {
        let userList = users.getUserList('The Office of SAY Team1');
        expect(userList).toEqual(['Anil1', 'Anil2']);

    })

    it('should retun names for The Office of SAY Team1', () => {
        let userList = users.getUserList('The Office of SAY Team3');
        expect(userList).toEqual(['Anil3'])
    })


    it('should find user', () => {
        let userID = '2';
        user = users.getUser(userID);
        expect(user.id).toBe(userID);
    })

    it('should not find user', () => {
        let userID = '150';
        user = users.getUser(userID);
        expect(user).toBeUndefined();
    });

    it('should not remove a user', () => {
        let userID = '108';
        user = users.removeUser(userID);
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    })

    it('should remove a user', () => {
        let userID = '1';
        user = users.removeUser(userID);
        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
    })
});