import { AddressProvider } from '../address-provider'

class InMemoryAddressProvider implements AddressProvider {
  async searchAddressByCep(cep: string) {
    return {
      city: 'city',
      state: 'state',
    }
  }
}

export { InMemoryAddressProvider }
