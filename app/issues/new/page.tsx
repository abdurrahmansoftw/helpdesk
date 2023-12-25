'use client'

import { createIssueSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })

  const [error, setError] = useState('')

  return (
    <div>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text> {error} </Callout.Text>
        </Callout.Root>
      )}
      <form
        className='max-w-xl space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('Something went wrong')
          }
        })}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        {errors.title && (
          <Text as='p' color='red'>
            {errors.title.message}
          </Text>
        )}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {errors.description && (
          <Text as='p' color='red'>
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue </Button>
      </form>
    </div>
  )
}

export default NewIssuePage
