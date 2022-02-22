import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store'
import { cloneDeep } from 'lodash'

test('increments "count" value when "increment" is committed', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(store))
    expect(store.state.count).toBe(0)
    store.commit('increment')
    expect(store.state.count).toBe(1)
})

test('updates "evenOrOdd" getter when "increment" is committed', () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(store))
    expect(store.getters.evenOrOdd).toBe('even')
    store.commit('increment')
    expect(store.getters.evenOrOdd).toBe('odd')
})