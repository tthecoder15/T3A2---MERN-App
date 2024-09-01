import React, { useState } from 'react'
import sessionState from '../../routes/store';
import DeletePetPopup from '../Popups/DeletePetPopup';

const DisplaySinglePet = ({ appt, updateB, deleteB }) => {
    const userData = sessionState((state) => state.userData);
    
    let pets = userData.pets

    if (!pets) return <></>

    const [popupIsOpen, setPopupIsOpen] = useState(false)

    const makePopupOpen = () => {
        setPopupIsOpen(true)
    }

    const makePopupClose = () => {
        setPopupIsOpen(false)
    }
    

    return (
    <div className='appointment-box'>
        {userData.pets.map((pet) => {
            return (
              <div key={pet.petName}>
                <p>Pet Name: {pet.petName}</p>
                <p>Born: {pet.birthYear}</p>
                <p>Breed: {pet.breed}</p>
                { deleteB ? <button onClick={makePopupOpen}>Delete Pet</button> : null}
        <DeletePetPopup pet={pet} popupIsOpen={popupIsOpen} makePopupClose={makePopupClose}/>
              </div>
            );
          })}
        
    </div>
    )
}

export default DisplaySinglePet