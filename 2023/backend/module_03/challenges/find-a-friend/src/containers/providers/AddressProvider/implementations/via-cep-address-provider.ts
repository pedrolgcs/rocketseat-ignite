import { SearchAddress } from '@/errors/shared'
import { viaCepAPI } from '@/lib/axios'
import { AddressProvider } from '../address-provider'

type AddressByCepResponse = {
  localidade: string
  uf: string
}

class ViaCepAddressProvider implements AddressProvider {
  async searchAddressByCep(cep: string) {
    try {
      const { data: address } = await viaCepAPI.get<AddressByCepResponse>(
        `/${cep}/json`,
      )

      return {
        city: address.localidade,
        state: address.uf,
      }
    } catch (error) {
      throw new SearchAddress()
    }
  }
}

export { ViaCepAddressProvider }
