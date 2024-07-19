import { Head, useForm, usePage } from '@inertiajs/react'

import React from 'react'
import InputGroup from '~/components/input_group'

export default function LoginPage() {
  const {
    data,
    setData,
    post,
    processing,
    errors: formErrors,
  } = useForm({
    email: '',
    password: '',
  })

  // TODO : type
  const { errors }: any = usePage().props

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    post('/login')
  }

  // TODO : csrf token

  return (
    <>
      <Head title="Login" />
      <div className="p-28 flex flex-col gap-10">
        <h1 className="text-3xl title">
          Hi, Welcome back to <span className="text-primary">Cona News</span>
        </h1>
        <hr className="divide-gray-800" />
        {errors && <span className="text-red-500 font-bold">{errors}</span>}
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
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
              label="Password"
              onChange={setData}
            />
          </div>
          <button type="submit" className="p-3 rounded cta-primary" disabled={processing}>
            Login
          </button>
        </form>
      </div>
    </>
  )
}
