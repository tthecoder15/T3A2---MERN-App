import React from 'react'
import { useForm, ValidationError } from '@formspree/react'

function ContactForm() {
  const [state, handleSubmit] = useForm("xzzpareq")
  if (state.succeeded) {
      return <p>Thank you for contacting.  
        We will receive your enquiry shortly and be in touch as soon as possible.
        </p>
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full Name
      </label>
      <input/>
      <label>
        Contact Number
      </label>
      <input/>
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label>
        Pet Details
      </label>
      <input/>
      <label>
        Your query
      </label>
      <textarea
        id="message"
        name="message"
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