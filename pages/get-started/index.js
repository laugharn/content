import axios from 'axios'
import { Input } from '~/components/input'
import { LayoutRoot } from '~/components/layout'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useUser } from '~/containers/user'
import { validator } from '~/lib/data'

const emailSchema = {
  properties: {
    email: { format: 'email', type: 'string' },
  },
  required: ['email'],
  type: 'object',
}

/**
 * 1. Email form. If query.channel, this is the subscribe form
 * 2.
 */

const Page = ({ query, user }) => {
  const { authenticate, login } = useUser()
  const [step, setStep] = useState(query.channel ? 'subscribe' : 'email')

  const codeForm = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: async (values) => {
      await login(values)
    },
  })

  const emailForm = useFormik({
    initialValues: {
      email: '',
      redirect: query.redirect ?? '/home',
    },
    onSubmit: async (values) => {
      await login(values)
      setStep('code')
    },
    validate: (values) => {
      return validator(values, emailSchema)
    },
  })

  const subscriptionForm = useFormik({
    initialValues: {
      channel: query.channel ?? '',
      email: '',
    },
    onSubmit: async (values) => {
      const { subscription } = await axios
        .post('/api/v1/subscriptions', values)
        .then((response) => response.data)

      authenticate(query.redirect ?? `/channels/${channel.name}`, subscription.user)
    },
  })

  return (
    <LayoutRoot>
      <div className="max-w-3xl mx-auto px-4 py-6">
        {step === 'code' && (
          <form onSubmit={codeForm.handleSubmit}>
            <div className="py-2 w-full">
              Submit the Pass code you received in your inbox below. If you just submitted your
              email address, it might take a minute or two for your pass to arrive. Don't have a
              pass?{' '}
              <button
                className="text-gray-500 hover:text-teal-500"
                onClick={() => {
                  setStep('email')
                }}
              >
                Click here
              </button>{' '}
              to get one.
            </div>
            <div className="py-2 w-full">
              <Input
                error={codeForm.errors.code}
                label="6-Digit Code"
                name="code"
                onBlur={codeForm.handleBlur}
                onChange={codeForm.handleChange}
                touched={codeForm.touched.code}
                value={codeForm.values.code}
              />
            </div>
            <div className="py-2 w-full">
              <button
                className="bg-teal-300 hover:bg-teal-500 leading-none p-4 rounded"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        )}
        {step === 'email' && (
          <form onSubmit={emailForm.handleSubmit}>
            <div className="py-2 w-full">
              To log in, submit your email address. If an account matches that address, you'll get
              sent a one time Pass good for the next 15 minutes. Already have a Pass?{' '}
              <button
                className="text-gray-500 hover:text-teal-500"
                onClick={(event) => {
                  event.preventDefault()

                  setStep('code')
                }}
              >
                Click here
              </button>{' '}
              to use it.
            </div>
            <div className="py-2 w-full">
              <Input
                error={emailForm.errors.email}
                label="Email Address"
                name="email"
                onBlur={emailForm.handleBlur}
                onChange={emailForm.handleChange}
                touched={emailForm.touched.email}
                type="email"
                value={emailForm.values.email}
              />
            </div>
            <div className="py-2 w-full">
              <button
                className="bg-teal-300 hover:bg-teal-500 leading-none p-4 rounded"
                type="submit"
              >
                Get Code
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-300 leading-none ml-4 p-4 rounded text-white"
                onClick={async (event) => {
                  event.preventDefault()

                  await login({ dev: true, ...emailForm.values })
                }}
              >
                Dev Mode
              </button>
            </div>
          </form>
        )}
        {step === 'subscribe' && (
          <form onSubmit={subscriptionForm.handleSubmit}>
            <div className="py-2 w-full">
              <Input
                error={subscriptionForm.errors.email}
                label="Email Address"
                name="email"
                onBlur={subscriptionForm.handleBlur}
                onChange={subscriptionForm.handleChange}
                touched={subscriptionForm.touched.email}
                type="email"
                value={subscriptionForm.values.email}
              />
            </div>
            <div className="py-2 w-full">
              <button
                className="bg-teal-300 hover:bg-teal-500 leading-none p-4 rounded"
                type="submit"
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
    </LayoutRoot>
  )
}

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      query,
      user: {},
    },
  }
}

export default Page
