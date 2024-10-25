import { Head, useForm } from '@inertiajs/react'

import InputGroup from '~/components/input_group'

export default function RegisterPage() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
  })

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    post('/register')
  }

  // TODO : csrf token

  return (
    <>
      <Head title="Register" />
      <div className="p-28 flex flex-col gap-10">
        <h1 className="text-3xl title">
          Hi, Welcome to <span className="text-primary">Coma News</span>
        </h1>
        <hr className="divide-gray-800" />
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <InputGroup
              id="name"
              type="text"
              name="name"
              value={data.name}
              field="name"
              placeholder="Joe Doe"
              error={errors?.name}
              label="Your name"
              onChange={setData}
            />
            <InputGroup
              id="email"
              type="email"
              name="email"
              value={data.email}
              field="email"
              placeholder="joe.doe@hotmail.com"
              error={errors?.email}
              label="Your email"
              onChange={setData}
            />
            <InputGroup
              id="password"
              type="password"
              name="password"
              value={data.password}
              field="password"
              placeholder="Enter your password"
              error={errors?.password}
              label="Your password"
              onChange={setData}
            />
            <InputGroup
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              field="password_confirmation"
              placeholder="Confirm your password"
              error={errors?.password_confirmation}
              label="Password confirmation"
              onChange={setData}
            />
          </div>
          <button type="submit" className="p-3 rounded cta-primary" disabled={processing}>
            Register
          </button>
        </form>
      </div>
    </>
  )
}
