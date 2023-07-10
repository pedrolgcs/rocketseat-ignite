import { Entity } from '@/core/domain'

type OrganizationProps = {
  name: string
  email: string
  cep: string
  state: string
  city: string
  address: string
  latitude: number
  longitude: number
  phone: string
  passwordHash: string
  createdAt?: Date
}

class Organization extends Entity<OrganizationProps> {
  private constructor(props: OrganizationProps, id?: string) {
    super(props, id)
  }

  public static create(props: OrganizationProps, id?: string) {
    return new Organization(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }

  public get name(): string {
    return this.props.name
  }

  public set name(value: string) {
    this.props.name = value
  }

  public get email(): string {
    return this.props.email
  }

  public set email(value: string) {
    this.props.email = value
  }

  public get cep(): string {
    return this.props.cep
  }

  public set cep(value: string) {
    this.props.cep = value
  }

  public get state(): string {
    return this.props.state
  }

  public set state(value: string) {
    this.props.state = value
  }

  public get city(): string {
    return this.props.city
  }

  public set city(value: string) {
    this.props.city = value
  }

  public get address(): string {
    return this.props.address
  }

  public set address(value: string) {
    this.props.address = value
  }

  public get latitude(): number {
    return this.props.latitude
  }

  public set latitude(value: number) {
    this.props.latitude = value
  }

  public get longitude(): number {
    return this.props.longitude
  }

  public set longitude(value: number) {
    this.props.longitude = value
  }

  public get phone(): string {
    return this.props.phone
  }

  public set phone(value: string) {
    this.props.phone = value
  }

  public get passwordHash(): string {
    return this.props.passwordHash
  }

  public set passwordHash(value: string) {
    this.props.passwordHash = value
  }

  public get createdAt(): Date {
    return this.props.createdAt!
  }

  public set createdAt(value: Date) {
    this.props.createdAt = value
  }
}

export { Organization }
