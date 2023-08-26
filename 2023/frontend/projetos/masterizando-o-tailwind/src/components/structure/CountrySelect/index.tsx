'use client'

import { useState } from 'react'
import Flag from 'react-world-flags'
import { Select } from '@/components/ui'
import { countryListAlpha3 } from '@/utils/countries'

type CountryCode = keyof typeof countryListAlpha3

export function CountrySelect() {
  const [value, setValue] = useState<CountryCode>('BRA')

  function handleCountrySelected(value: CountryCode) {
    setValue(value)
  }

  return (
    <Select.Root value={value} onValueChange={handleCountrySelected}>
      <Select.Trigger>
        <Select.Value placeholder="Select your country...">
          {value && (
            <>
              <Flag
                className="h-5 w-5 rounded-full object-cover object-center"
                code={value}
              />

              {countryListAlpha3[value]}
            </>
          )}
        </Select.Value>
      </Select.Trigger>

      <Select.Content>
        {Object.entries(countryListAlpha3).map(([code, title]) => {
          return (
            <Select.Item key={code} value={code}>
              <Select.ItemText>
                <Select.ItemPrefix>
                  <Flag
                    className="h-5 w-5 rounded-full object-cover object-center"
                    code={code}
                  />
                </Select.ItemPrefix>

                {title}
              </Select.ItemText>
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
