import React from "react";
import "../components/Team/team.css";

const Team = () => {
  return (
    <div className="contentFrame">
      <div className="team">
        <h1>Our Team</h1>
        <div>
          <img src="../../docs/Vets/Dr-Riley-Kim.webp" alt="Dr Riley Kim" />
          <div className="team-member">
            <h3>Dr. Riley Kim</h3>
            <p>
              Dr. Riley Kim is a dedicated veterinarian at Pawfect Care. With a
              gentle and compassionate nature, Dr. Kim has a unique ability to
              connect with animals and their owners. Her passion for animal
              welfare is evident in her work, from routine check-ups to complex
              surgeries. A graduate of the University of Melbourne, Dr. Kim
              brings a wealth of knowledge and experience to the clinic.
            </p>
          </div>
        </div>
        <div>
          <img
            src="../../docs/Vets/Dr-Ethan-Walker.png"
            alt="Dr Ethan Walker"
          />
          <div className="team-member">
            <h3>Dr. Ethan Walker</h3>
            <p>
              Dr. Ethan Walker is a skilled and compassionate veterinarian at
              Pawfect Care. Originally from rural Victoria, his upbringing
              around livestock fostered a deep love for animals. He brought this
              passion with him to veterinary school, where he excelled in both
              large and small animal care. Dr. Walker's calm demeanor and gentle
              hands make him a favorite among both pets and their owners.
            </p>
          </div>
        </div>
        <div>
          <img src="../../docs/Vets/Dr-Jess-Taylor.jpg" alt="Dr Jess Taylor" />
          <div className="team-member">
            <h3>Dr. Jess Taylor</h3>
            <p>
              Dr. Jess Taylor is a bright and enthusiastic veterinarian starting
              her career at Pawfect Care. Fresh out of veterinary school, she
              brings a youthful energy and a thirst for knowledge to the clinic.
              Jess's genuine love for animals is evident in her gentle approach
              and dedication to patient care. While still gaining experience,
              her natural talent and compassionate nature make her a promising
              addition to the Pawfect Care team.
            </p>
          </div>
        </div>
        <div>
          <img src="../../docs/Vets/Ben.webp" alt="Ben the janitor" />
          <div className="team-member">
            <h3>Ben the Janitor</h3>
            <p>
              Ben is Pawfect Care's dedicated and cheerful janitor. Known for
              his quick wit and even quicker hands, he keeps the clinic
              sparkling clean. With a pair of signature cool glasses perched on
              his nose, Ben brings a touch of style to his everyday tasks. While
              he doesn't share the same passion for pets as his colleagues, he
              genuinely cares about the clinic and its patients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
