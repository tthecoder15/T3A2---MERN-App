import React, { useState } from 'react'

const ServicesButtons = () => {
    const [displayedText, setDisplayedText] = useState('')

    const handleButtonClick = (text) => {
        setDisplayedText(text)
    }

  return (
    <div>
      <div>
        <button onClick={() => handleButtonClick(
            <>
                <h2>Check-Ups</h2>
                <p>
                    A typical checkup at our clinic involves a comprehensive evaluation of your pet's health. 
                    Our veterinarians will conduct a thorough physical exam, administer necessary vaccinations, and recommend appropriate parasite prevention. 
                    We'll also assess your pet's dental health, weight, and behavior, offering guidance and treatment as needed. 
                    For older or specific breeds, additional tests like blood work or urine analysis might be recommended. 
                    We believe in creating a comfortable environment for both you and your pet, so feel free to ask any questions or express your concerns. 
                    Regular checkups are crucial for early detection of potential health issues and maintaining your pet's overall well-being.
                </p>
            </>
            )}>Check-Ups</button>
        <button onClick={() => handleButtonClick(
            <>
                <h2>Dental Service</h2>
                <p>Dental health is an often-overlooked aspect of pet care, but it’s crucial for their overall well-being. 
                    Our clinic offers comprehensive dental services to keep your pet’s smile bright and healthy. 
                    Regular dental checkups involve a thorough examination of your pet’s teeth and gums, 
                    looking for signs of disease such as tartar buildup, gingivitis, or tooth decay. 
                    We can perform professional cleanings to remove plaque and tartar, as well as address more complex dental issues like extractions or oral surgery. 
                    Our goal is to prevent painful dental problems and ensure your pet enjoys good oral health throughout their life.
                </p>
            </>
            )}>Dental Service</button>
        <button onClick={() => handleButtonClick(
            <>
                <h2>Vaccinations</h2>
                <p>Vaccinations are a vital part of preventive care for your pet. 
                    They help protect them from a variety of contagious diseases that can be serious or even fatal. 
                    Our clinic offers a range of vaccines tailored to your pet's lifestyle, age, and overall health. 
                    During your pet's checkup, we'll recommend a vaccination schedule based on their specific needs. 
                    We understand that there are many questions about vaccinations, 
                    and we're here to provide clear and accurate information to help you make informed decisions about your pet's health.
                </p>
            </>
            )}>Vaccinations</button>
        <button onClick={() => handleButtonClick(
            <>
                <h2>Surgeries</h2>
                <p>Surgery is sometimes necessary to address health issues in pets. 
                    Our experienced veterinarians perform a wide range of surgical procedures, from routine spaying and neutering to complex orthopedic surgeries. 
                    We understand that surgery can be stressful for both you and your pet, so we prioritize a gentle and caring approach. 
                    Before any procedure, we'll conduct a thorough examination and discuss the risks, benefits, and expected recovery time. 
                    Your pet's comfort and well-being are our top priorities, and we'll provide clear post-operative care instructions to ensure a smooth recovery.
                </p>
            </>
            )}>Surgeries</button>
      </div>
      <div>
        {displayedText && <p>{displayedText}</p>}
      </div>
    </div>
  );
}

export default ServicesButtons