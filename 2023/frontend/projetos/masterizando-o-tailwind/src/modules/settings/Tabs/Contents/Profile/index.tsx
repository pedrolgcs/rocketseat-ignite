import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Flag from 'react-world-flags'
import { Select } from '@/components/ui'
import { countriesSelectOptions } from '@/utils/countries'

function Profile() {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => console.log(data)

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Select.Root
              onValueChange={onChange}
              value={value}
              name={name}
              autoComplete="country"
            >
              <Select.Trigger>
                <Select.Value placeholder="Select an option" />
              </Select.Trigger>

              <Select.Content>
                {countriesSelectOptions.map(({ value, label }) => (
                  <Select.Item key={value} value={value}>
                    <Select.ItemText>
                      <Select.ItemPrefix>
                        <Flag
                          code={value}
                          className="h-5 w-5 rounded-full object-cover object-center"
                        />
                      </Select.ItemPrefix>

                      {label}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />

        <button type="submit">cadastrar</button>
      </form>
    </div>
  )
}

export { Profile }
