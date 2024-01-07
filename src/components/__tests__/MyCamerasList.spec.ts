import { shallowMount } from "@vue/test-utils";
import MyCamerasList from "../MyCamerasList.vue";
import { describe, it, expect } from 'vitest'

describe('MyCamerasList.vue', () => {
  it('newCameraBttn is displayed', () => {
    const wrapper = shallowMount(MyCamerasList)
    expect(wrapper.find('#newCameraBttn').exists()).toBe(true)
  })
});























