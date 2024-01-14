import { shallowMount, flushPromises } from "@vue/test-utils";
import MyCamerasList from "../MyCamerasList.vue";
import { describe, it, expect, vi } from 'vitest'
import type { Cameramodel } from '@/types'
import axios from "axios";


describe('MyCamerasList.vue', () => {
  const twoCameraModels: Cameramodel[] = [
    { id: 1, name: 'Nikon F3', brand: 'Nikon', model: 'F3', staticImageUrl: 'https://static.photocdn.pt/images/articles/2017/04/28/iStock-646511634.jpg', formatThirtyFive: true, formatOneTwenty: false},
    { id: 2, name: 'Canon AE-1', brand: 'Canon', model: 'AE-1', staticImageUrl: 'https://static.photocdn.pt/images/articles/2017/04/28/iStock-546424192.jpg', formatThirtyFive: true, formatOneTwenty: false}
  ]

  vi.mock('axios')

  it('should render the items from the backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValue({ data: twoCameraModels })

    const item = twoCameraModels[1].name
    const wrapper = shallowMount(MyCamerasList)

    await flushPromises()

    expect(wrapper.text()).toContain(item)
  })

  it('should display the add new camera button', () => {
    const wrapper = shallowMount(MyCamerasList)
    expect(wrapper.find('#newCameraBttn').exists()).toBe(true)
  })
})