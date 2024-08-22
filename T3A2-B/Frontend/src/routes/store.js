import { create } from 'zustand'

const apiBase = "https://t3a2-mern-app.onrender.com"

const sessionState = create(set => {
  return {
    users: [],
    vets: [],
    appointments: [],
    pets: [],
  }
})

export default sessionState