import sessionState from './store'
import MyAccountDash from '../components/MyAcc/MyAccountDash'

const MyAcc = () => {
  const userData = sessionState((state) => state.userData)
  const isAuthenticated = sessionState((state) => state.isAuthenticated)
  
  if (!userData.firstName) {
    return  <div className="contentFrame">
              <h3>Loading request...</h3>
            </div>
  }  

  return (
    <>
      <div className="contentFrame">
        <h4>Welcome {userData.firstName} {userData.lastName}</h4>
        <p>Manage your appointments, personal information, pet information, and your history with us.</p>
        <MyAccountDash/>
      </div>
    </>
  )
}

export default MyAcc
