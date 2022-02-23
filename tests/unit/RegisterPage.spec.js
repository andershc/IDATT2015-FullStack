import RegisterPage from "@/views/RegisterPage";
import { shallowMount } from '@vue/test-utils';
import store from '@/store';


describe('RegisterPage', () => {
    test('Typing in username and password in registration', async() =>{
        const wrapper = shallowMount(RegisterPage)

        await wrapper.find('[data-testid="usernameRegistrationField"]').setValue('anders');
        await wrapper.find('[data-testid="passwordRegistrationField"]').setValue('password');
        expect(wrapper.vm.user.username).toBe('anders')
        expect(wrapper.vm.user.password).toBe('password');
    })

    test('If username and password is correct',async() =>{
        const wrapper = shallowMount(RegisterPage);
        const user = {
            username: "testUser",
            password: "testPassword",
        };
        await wrapper
            .find('[data-testid="usernameRegistrationField"]')
            .setValue(user.username);
        await wrapper
            .find('[data-testid="passwordRegistrationField"]')
            .setValue(user.password);

        await wrapper.find('[data-testid="submit"]').trigger('click');

        const expectedName = store.state.users.at(store.state.users.length -1).username
        const expectedPassword = store.state.users.at(store.state.users.length -1).password

        expect(expectedName).toBe(user.username);
        expect(expectedPassword).toBe(user.password);
    })

    test('If username and password is not correct, login status = failed',async() =>{
        const wrapper = shallowMount(RegisterPage);
        const user = {
            username: "",
            password: "",
        };
        await wrapper
            .find('[data-testid="usernameRegistrationField"]')
            .setValue(user.username);
        await wrapper
            .find('[data-testid="passwordRegistrationField"]')
            .setValue(user.password);

        await wrapper.find('[data-testid="submit"]').trigger('click');

        const expected = wrapper.vm.registerStatus

        expect(wrapper.find('[data-testid="registerStatusField"]').isVisible()).toBe(true)
        expect(expected).toBe("failed");
    })
})