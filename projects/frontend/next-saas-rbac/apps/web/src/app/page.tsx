import { auth } from '@/features/authenticate'

export default async function Home() {
  const { user } = await auth()

  console.log(user)

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
