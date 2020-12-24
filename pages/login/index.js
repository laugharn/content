import axios from 'axios'
import { Input } from '~/components/input'
import { LayoutRoot } from '~/components/layout'
import { POST } from '~/lib/http'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useUser } from '~/containers/user'
import { validator } from '~/lib/data'

const schema = {
  properties: {
    email: { format: 'email', type: 'string' },
  },
  required: ['email'],
  type: 'object',
}

const Page = () => {
  const { push } = useRouter()
  const { login, setUser } = useUser()

  const emailForm = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      await login(values)
    },
    validate: (values) => {
      return validator(values, schema)
    },
  })

  return (
    <LayoutRoot>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <form onSubmit={emailForm.handleSubmit}>
          <div className="py-2 w-full">
            To log in, submit your email address. If an account matches that address, you'll get
            sent a one time Pass good for the next 15 minutes. Already have a Pass? Click here to
            use it.
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
              className="bg-black hover:bg-gray-500 leading-none p-4 rounded text-white"
              type="submit"
            >
              Login
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
      </div>
    </LayoutRoot>
  )
}

export default Page
