import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useSignOutMutation } from '../hooks/useSignOutMutation'

export function SignOut() {
  const navigate = useNavigate()

  const { mutateAsync: signOut, isPending: isSigningOut } = useSignOutMutation()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/sign-in', { replace: true })
    } catch (error) {
      toast.error('Falha ao realizar o logout, tente novamente!')
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex w-full items-center disabled:opacity-50"
      disabled={isSigningOut}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sair</span>
    </button>
  )
}
