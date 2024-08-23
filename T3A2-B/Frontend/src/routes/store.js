import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

const apiBase = "https://t3a2-mern-app.onrender.com"

const sessionState = create((set) => ({
    users: [],
    publicApptData: [],
    userData: [],
    token: null,
    isAuthenticated: false,
    error: null,
    apiBase: "https://t3a2-mern-app.onrender.com",

    // load: async () => {
    //   const token = get().token

    //   const headers = {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   }

    //   try {
    //     const [users, vets, appointments, pets] = await Promise.all([
    //       fetch(`${apiBase}/users`, { headers }).then(res => res.json()),
    //       fetch(`${apiBase}/vets`, { headers }).then(res => res.json()),
    //       fetch(`${apiBase}/appointments`, { headers }).then(res => res.json()),
    //       fetch(`${apiBase}/pets`, { headers }).then(res => res.json()),
    //     ])

    //     set({ users, vets, appointments, pets })

    //   } catch (error) {
    //     set({ error: 'Failed to load data' })
    //     console.error("Load error:", error)
    //   }
    // },

    login: async (email, password) => {
      try {
        const response = await fetch(`${apiBase}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        
        // Check if login promise.ok property is truthy - will be false is fetch fails
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to login')
        }

        // Convert login fetch promise to JSON obj
        const retToken = await response.json()
        
        // Set global state 'token', 'isAuthenticated'
        set({
          token: retToken.JWT,
          isAuthenticated: true,
          error: null,
        })

        // uId for passing to the call below to users/:id
        const uId = jwtDecode(retToken.JWT).userId

        // Call to user's specific end point, get their data
        const userIdGet = await fetch(`${apiBase}/users/${uId}`, {
          headers: {
            Authorization: `Bearer ${retToken.JWT}`,
            'Content-Type': 'application/json',
          }
        }) 
        
        // Check if promise.ok property is truthy - will be false is fetch fails
        if (!userIdGet.ok) {
          const errorUser = await userIdGet.json()
          throw new Error(errorUser.message || 'Failed to load user data')
        }

        // Convert retrieved login promise to JSON obj
        const retUserData = await userIdGet.json()

        // Set global state values
        set({
          error: null,
          userData: retUserData
        })        

      } 
      
      catch (error) {
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
        userData: null,
      })
    },
}))


export default sessionState