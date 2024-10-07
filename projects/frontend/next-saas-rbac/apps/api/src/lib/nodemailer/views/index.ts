type SendMemberInvite = {
  file: 'send-member-invite'
  variables: {
    link: string
    organization: string
    name: string
    role: string
  }
}

export type Templates = SendMemberInvite
