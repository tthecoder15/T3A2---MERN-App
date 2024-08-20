import React from 'react'
import { useForm, ValidationError } from '@formspree/react'

function ContactForm() {
  const [state, handleSubmit] = useForm("xzzpareq")
  if (state.succeeded) {
      return <p>Your message has been received.</p>
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name
      </label>
      <input
        id="name"
        type="text"
        name="Full Name"
      />
      <ValidationError 
        prefix="Name" 
        field="name"
        errors={state.errors}
      />
      <label>
        Contact Number
      </label>
      <input
        id="number"
        type="text"
        name="Contact Number"
      />
      <ValidationError 
        prefix="Number" 
        field="number"
        errors={state.errors}
      />
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="Email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label>
        Pet Details
      </label>
      <input
        id="pet"
        type="text"
        name="Pet Details"
      />
      <ValidationError 
        prefix="Pet" 
        field="pet"
        errors={state.errors}
      />
      <label>
        Your query
      </label>
      <textarea
        id="message"
        name="Message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm