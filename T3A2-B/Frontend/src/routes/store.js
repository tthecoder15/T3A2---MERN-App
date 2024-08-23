import { create } from 'zustand'

const apiBase = "https://t3a2-mern-app.onrender.com"

const sessionState = create((set) => ({
    users: [],
    vets: [],
    appointments: [],
    pets: [],
    user: null,
    isAuthenticated: false,
    error: null,

    load: async () => {
      const users = await (await fetch (`${apiBase}/users`)).json()
      const vets = await (await fetch (`${apiBase}/vets`)).json()
      const appointments = await (await fetch (`${apiBase}/appointments`)).json()
      const pets = await (await fetch (`${apiBase}/pets`)).json()
      set({ users, vets, appointments, pets })
    },

    login: async (email, password) => {
      try {
        const response = await fetch(`${apiBase}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        if (!resonse.ok) {
          throw new Error('Failed to login')
        }

        const data = await response.json()
        set({
          user: data.user,
          isAuthenticated: true,
          error: null,
        })
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        error: error.message,
      })
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    })
  }
}))


export default sessionState