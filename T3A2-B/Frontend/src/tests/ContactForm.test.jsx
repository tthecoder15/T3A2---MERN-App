import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { useForm } from '@formspree/react'
import ContactForm from '../components/Contact/ContactForm'
import renderWithRouter from './config/Setup'

// Mock the useForm hook
vi.mock('@formspree/react', () => ({
  useForm: vi.fn(),
  ValidationError: ({ prefix, field, errors }) => (
    <div>{errors && errors[field] && `${prefix} ${errors[field].message}`}</div>
  ),
}))

beforeAll(() => {
  if (!HTMLFormElement.prototype.requestSubmit) {
    HTMLFormElement.prototype.requestSubmit = function () {
      this.dispatchEvent(new Event('submit', { bubbles: true }))
    }
  }
})

describe('ContactForm', () => {
  beforeEach(() => {
    useForm.mockReturnValue([{ succeeded: false, submitting: false, errors: [] }, vi.fn()])
  })

  it('renders the contact form', () => {
    renderWithRouter(<ContactForm />)

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Pet Details/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Your query/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
  })

  it('submits the form when all fields are filled', async () => {
    const handleSubmit = vi.fn()
    useForm.mockReturnValue([{ succeeded: false, submitting: false, errors: [] }, handleSubmit])

    renderWithRouter(<ContactForm />)

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText(/Contact Number/i), { target: { value: '1234567890' } })
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/Pet Details/i), { target: { value: 'Dog, Labrador' } })
    fireEvent.change(screen.getByLabelText(/Your query/i), { target: { value: 'How do I train my dog?' } })

    const submitButton = screen.getByRole('button', { name: /Submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => expect(handleSubmit).toHaveBeenCalled())
  })

  it('displays a success message after successful submission', async () => {
    useForm.mockReturnValue([{ succeeded: true, submitting: false, errors: [] }, vi.fn()])

    renderWithRouter(<ContactForm />)

    await waitFor(() => expect(screen.getByText(/Your message has been received./i)).toBeInTheDocument())
  })
})
