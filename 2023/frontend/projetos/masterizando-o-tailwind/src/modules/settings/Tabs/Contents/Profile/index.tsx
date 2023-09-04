import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextEditor } from '@/components/ui'

function Profile() {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: unknown) => console.log(data)

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Controller
          name="bio"
          control={control}
          render={({ field: { name, onChange } }) => (
            <TextEditor
              name={name}
              onChangeContent={onChange}
              defaultContent="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
            />
          )}
        />
        <button type="submit">cadastrar</button>
      </form>
    </div>
  )
}

export { Profile }
