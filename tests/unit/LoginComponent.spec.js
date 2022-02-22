import LoginComponent from "@/components/LoginComponent";
import { shallowMount } from '@vue/test-utils'
import store from '@/store'


describe('LoginComponent', () => {
    beforeEach(() => {
        const user = {username: "anders", password: "password"};
        store.commit("ADD_USER", user)

    })
    test('Typing in username and password', async() =>{
        const wrapper = shallowMount(LoginComponent)

        // get loginstatusLabel element
        const username = wrapper.find('[data-testid="usernameField"]');
        const password = wrapper.find('[data-testid="passwordField"]');
        // change loginStatus data and check that loginstatusLabel element is updated accordingly
        await username.setValue('anders');
        await password.setValue('password');
        expect(wrapper.vm.user.username).toBe('anders')
        expect(wrapper.vm.user.password).toBe('password');
    })

    it('Modify LoginComponent data and test', async () => {
        const wrapper = shallowMount(LoginComponent)

        // get loginstatusLabel element
        const statusId = wrapper.find('[data-testid="loginStatusField"]');
        // change loginStatus data and check that loginstatusLabel element is updated accordingly
        await wrapper.setData({loginStatus: 'Success'});
        expect(statusId.element.textContent).toBe('Success');
        await wrapper.setData({loginStatus: 'Failed'});
        expect(statusId.element.textContent).toBe('Failed');
    })

    test('If username and password is correct, login status = success',async() =>{
        const wrapper = shallowMount(LoginComponent)
        await wrapper.find('[data-testid="usernameField"]').setValue('anders')
        await wrapper.find('[data-testid="passwordField"]').setValue('password')
        await wrapper.find('[data-testid="submit"]').trigger('click')

        expect(wrapper.find('[data-testid="loginStatusField"]').element.textContent).toBe('Success')
    })

    test('If username and password is not correct, login status = failed',async() =>{
        const wrapper = shallowMount(LoginComponent)
        await wrapper.find('[data-testid="usernameField"]').setValue('andersx')
        await wrapper.find('[data-testid="passwordField"]').setValue('passwordx')

        await wrapper.find('[data-testid="submit"]').trigger('click')

        expect(wrapper.find('[data-testid="loginStatusField"]').element.textContent).toBe('Failed')
    })
})