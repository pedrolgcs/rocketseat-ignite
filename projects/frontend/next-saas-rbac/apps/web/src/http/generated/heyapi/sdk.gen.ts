// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type OptionsLegacyParser,
} from '@hey-api/client-fetch'
import type {
  HealthCheckError,
  HealthCheckResponse,
  GetProfileError,
  GetProfileResponse,
  CreateAccountData,
  CreateAccountError,
  CreateAccountResponse,
  AuthenticateWithPasswordData,
  AuthenticateWithPasswordError,
  AuthenticateWithPasswordResponse,
  RequestPasswordRecoveryData,
  RequestPasswordRecoveryError,
  RequestPasswordRecoveryResponse,
  AuthenticateWithGithubData,
  AuthenticateWithGithubError,
  AuthenticateWithGithubResponse,
  ResetPasswordData,
  ResetPasswordError,
  ResetPasswordResponse,
  GetOrganizationData,
  GetOrganizationError,
  GetOrganizationResponse,
  UpdateOrganizationData,
  UpdateOrganizationError,
  UpdateOrganizationResponse,
  ShutdownOrganizationData,
  ShutdownOrganizationError,
  ShutdownOrganizationResponse,
  GetOrganizationsError,
  GetOrganizationsResponse,
  CreateOrganizationData,
  CreateOrganizationError,
  CreateOrganizationResponse,
  GetMembershipData,
  GetMembershipError,
  GetMembershipResponse,
  TransferOrganizationData,
  TransferOrganizationError,
  TransferOrganizationResponse,
  CreateProjectData,
  CreateProjectError,
  CreateProjectResponse,
  GetProjectsData,
  GetProjectsError,
  GetProjectsResponse,
  DeleteProjectData,
  DeleteProjectError,
  DeleteProjectResponse,
  GetProjectData,
  GetProjectError,
  GetProjectResponse,
  GetMembersData,
  GetMembersError,
  GetMembersResponse,
  UpdateMemberData,
  UpdateMemberError,
  UpdateMemberResponse,
  RemoveMemberData,
  RemoveMemberError,
  RemoveMemberResponse,
  CreateInviteData,
  CreateInviteError,
  CreateInviteResponse,
  GetInvitesData,
  GetInvitesError,
  GetInvitesResponse,
  GetInviteData,
  GetInviteError,
  GetInviteResponse,
  AcceptInviteData,
  AcceptInviteError,
  AcceptInviteResponse,
  RejectInviteData,
  RejectInviteError,
  RejectInviteResponse,
  RevokeInviteData,
  RevokeInviteError,
  RevokeInviteResponse,
  GetPendingInvitesError,
  GetPendingInvitesResponse,
  GetOrganizationBillingData,
  GetOrganizationBillingError,
  GetOrganizationBillingResponse,
} from './types.gen'

export const client = createClient(createConfig())

/**
 * Health check
 */
export const healthCheck = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    HealthCheckResponse,
    HealthCheckError,
    ThrowOnError
  >({
    ...options,
    url: '/health-check',
  })
}

/**
 * Get authenticated user profile
 */
export const getProfile = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetProfileResponse,
    GetProfileError,
    ThrowOnError
  >({
    ...options,
    url: '/profile',
  })
}

/**
 * Create an new account
 */
export const createAccount = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<CreateAccountData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateAccountResponse,
    CreateAccountError,
    ThrowOnError
  >({
    ...options,
    url: '/users',
  })
}

/**
 * Authenticate with e-mail and password
 */
export const authenticateWithPassword = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<AuthenticateWithPasswordData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    AuthenticateWithPasswordResponse,
    AuthenticateWithPasswordError,
    ThrowOnError
  >({
    ...options,
    url: '/sessions/password',
  })
}

/**
 * Request password recovery
 */
export const requestPasswordRecovery = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<RequestPasswordRecoveryData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    RequestPasswordRecoveryResponse,
    RequestPasswordRecoveryError,
    ThrowOnError
  >({
    ...options,
    url: '/password/recover',
  })
}

/**
 * Authenticate with github
 */
export const authenticateWithGithub = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<AuthenticateWithGithubData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    AuthenticateWithGithubResponse,
    AuthenticateWithGithubError,
    ThrowOnError
  >({
    ...options,
    url: '/sessions/github',
  })
}

/**
 * Reset password
 */
export const resetPassword = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<ResetPasswordData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    ResetPasswordResponse,
    ResetPasswordError,
    ThrowOnError
  >({
    ...options,
    url: '/password/reset',
  })
}

/**
 * Get details from organization
 */
export const getOrganization = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<GetOrganizationData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetOrganizationResponse,
    GetOrganizationError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}',
  })
}

/**
 * Update organization details
 */
export const updateOrganization = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<UpdateOrganizationData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateOrganizationResponse,
    UpdateOrganizationError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}',
  })
}

/**
 * Shutdown organization
 */
export const shutdownOrganization = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<ShutdownOrganizationData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    ShutdownOrganizationResponse,
    ShutdownOrganizationError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}',
  })
}

/**
 * Get organizations where user is a member
 */
export const getOrganizations = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetOrganizationsResponse,
    GetOrganizationsError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations',
  })
}

/**
 * Create an new organization
 */
export const createOrganization = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<CreateOrganizationData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateOrganizationResponse,
    CreateOrganizationError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations',
  })
}

/**
 * Get user membership on organization
 */
export const getMembership = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<GetMembershipData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetMembershipResponse,
    GetMembershipError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/membership',
  })
}

/**
 * Transfer organization ownership
 */
export const transferOrganization = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<TransferOrganizationData, ThrowOnError>
) => {
  return (options?.client ?? client).patch<
    TransferOrganizationResponse,
    TransferOrganizationError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/owner',
  })
}

/**
 * Create an new project
 */
export const createProject = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<CreateProjectData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateProjectResponse,
    CreateProjectError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/projects',
  })
}

/**
 * Get all organization projects
 */
export const getProjects = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<GetProjectsData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetProjectsResponse,
    GetProjectsError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/projects',
  })
}

/**
 * Delete a project
 */
export const deleteProject = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<DeleteProjectData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteProjectResponse,
    DeleteProjectError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/projects/{projectId}',
  })
}

/**
 * Get project details
 */
export const getProject = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<GetProjectData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetProjectResponse,
    GetProjectError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{orgSlug}/projects/{projectSlug}',
  })
}

/**
 * Get all organization members
 */
export const getMembers = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<GetMembersData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetMembersResponse,
    GetMembersError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/members',
  })
}

/**
 * Update a member
 */
export const updateMember = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<UpdateMemberData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateMemberResponse,
    UpdateMemberError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/members/{memberId}',
  })
}

/**
 * Remove a member from an organization
 */
export const removeMember = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<RemoveMemberData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    RemoveMemberResponse,
    RemoveMemberError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/members/{memberId}',
  })
}

/**
 * Create an new invite
 */
export const createInvite = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<CreateInviteData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateInviteResponse,
    CreateInviteError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/invites',
  })
}

/**
 * Get all organization invites
 */
export const getInvites = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<GetInvitesData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetInvitesResponse,
    GetInvitesError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/invites',
  })
}

/**
 * Get an invite
 */
export const getInvite = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<GetInviteData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetInviteResponse,
    GetInviteError,
    ThrowOnError
  >({
    ...options,
    url: '/invites/{inviteId}',
  })
}

/**
 * Accept an invite
 */
export const acceptInvite = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<AcceptInviteData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    AcceptInviteResponse,
    AcceptInviteError,
    ThrowOnError
  >({
    ...options,
    url: '/invites/{inviteId}/accept',
  })
}

/**
 * Reject an invite
 */
export const rejectInvite = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<RejectInviteData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    RejectInviteResponse,
    RejectInviteError,
    ThrowOnError
  >({
    ...options,
    url: '/invites/{inviteId}/reject',
  })
}

/**
 * Revoke an invite
 */
export const revokeInvite = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<RevokeInviteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    RevokeInviteResponse,
    RevokeInviteError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/invites/{inviteId}',
  })
}

/**
 * Get all pending invites
 */
export const getPendingInvites = <ThrowOnError extends boolean = false>(
  options?: OptionsLegacyParser<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetPendingInvitesResponse,
    GetPendingInvitesError,
    ThrowOnError
  >({
    ...options,
    url: '/pending-invites',
  })
}

/**
 * Get billing information from organization
 */
export const getOrganizationBilling = <ThrowOnError extends boolean = false>(
  options: OptionsLegacyParser<GetOrganizationBillingData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetOrganizationBillingResponse,
    GetOrganizationBillingError,
    ThrowOnError
  >({
    ...options,
    url: '/organizations/{slug}/billing',
  })
}
