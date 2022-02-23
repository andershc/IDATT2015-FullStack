import store from '@/store'

describe('testing store', () => {
    test('adding a user', async() => {
        const testUser = { username:"name", password: "password" };
        await store.commit('ADD_USER', testUser)
        const received = store.state.users.pop()
        expect(received).toStrictEqual(testUser)
    })
    test('getting a user that does not exist or list is empty', async() => {
        const received = store.state.users.pop()
        expect(received).toBeUndefined()
    })
    test('Setting a current user', async() => {
        const testUser = { username:"name", password: "password" };
        await store.commit('SET_USER', testUser)
        const received = store.state.user
        expect(received).toStrictEqual(testUser)
    })
    test('Setting users', async() => {
        const testUser = { username:"name", password: "password" };
        const testUser1 = { username:"name1", password: "password1" };
        const testUser2 = { username:"name2", password: "password2" };
        const users = [];
        users.push(testUser1)
        users.push(testUser2)
        users.push(testUser)
        await store.commit('SET_USERS', users)
        const received = store.state.users.length
        expect(received).toEqual(users.length)
    })
})
