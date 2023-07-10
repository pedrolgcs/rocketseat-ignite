type SearchAddressByCepResponse = {
  city: string
  state: string
}

interface AddressProvider {
  searchAddressByCep(cep: string): Promise<SearchAddressByCepResponse>
}

export { AddressProvider }
