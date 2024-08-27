import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const apiBase = "https://t3a2-mern-app.onrender.com"

const sessionState = create (
  persist (  
  (set) => ({
      users: [],
      publicApptData: {},
      userData: {},
      setUserData: (newData) => {
        set((state) => ({
          userData: {
            ...state.userData,
            email: newData.email, 
            firstName: newData.firstName, 
            lastName: newData.lastName, 
            phNumber: newData.phNumber,
          }
        }))
      },
      token: null,
      isAuthenticated: false,
      error: null,
      apiBase: "https://t3a2-mern-app.onrender.com",

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
            throw new Error(errorData.message || 'Failed to login: Please make sure your email and password are correct.')
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
          publicApptData: null
        })
      },
    }), 
    {
      name: 'loggedInData',
      storage: createJSONStorage(() => sessionStorage)
    },
  ),
)


export default sessionState