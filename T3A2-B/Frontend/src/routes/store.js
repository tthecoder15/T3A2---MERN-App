import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

const apiBase = "https://t3a2-mern-app.onrender.com"

const sessionState = create((set) => ({
    users: [],
    vets: [],
    publicApptData: [],
    appointments: [],
    pets: [],
    userId: null,
    token: null,
    isAuthenticated: false,
    error: null,

    load: async () => {
      const token = get().token

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }

      try {
        const [users, vets, appointments, pets] = await Promise.all([
          fetch(`${apiBase}/users`, { headers }).then(res => res.json()),
          fetch(`${apiBase}/vets`, { headers }).then(res => res.json()),
          fetch(`${apiBase}/appointments`, { headers }).then(res => res.json()),
          fetch(`${apiBase}/pets`, { headers }).then(res => res.json()),
        ])

        set({ users, vets, appointments, pets })

      } catch (error) {
        set({ error: 'Failed to load data' })
        console.error("Load error:", error)
      }
    },

    login: async (email, password) => {
      try {
        const response = await fetch(`${apiBase}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to login')
        }

        const data = await response.json()
        console.log('here is Login response data (currently JWT): ', data)
        console.log(jwtDecode(data.JWT))
      
        set({
          token: data.JWT,
          isAuthenticated: true,
          error: null,
          userId: jwtDecode(data.JWT),
        })

        // uId for passing to the call below to users/:id
        const uId = jwtDecode(data.JWT).userId

        // Call to user's specific end point, get their data
        const userIdGet = await fetch(`${apiBase}/users/${uId}`, {
          headers: {
            Authorization: `Bearer ${data.JWT}`,
            'Content-Type': 'application/json',
          },
        })

        if (!userIdGet.ok) {
          const errorUser = await userIdGet.json()
          throw new Error(errorUser.message || 'Failed to load user data')
        }

        set({
          token: data.JWT,
          isAuthenticated: true,
          error: null,
          userId: jwtDecode(data.JWT),
        })

        console.log('ret data from solo users endpoint', userIdGet)
        
        

      } catch (error) {
          console.error("Login error:", error.message)
          set({
            token: null,
            isAuthenticated: false,
            error: error.message,
          })
      }
    },

    logout: () => {
      set({
        token: null,
        isAuthenticated: false,
        error: null,
        user: null,
        users: [],
        vets: [],
        appointments: [],
        pets: [],
      })
    },
}))


export default sessionState