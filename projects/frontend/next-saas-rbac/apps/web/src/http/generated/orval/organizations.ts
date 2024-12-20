/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Next.js SaaS
 * Full-stack SaaS app with multi-tenant & RBAC.
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod'


/**
 * @summary Get details from organization
 */
export const getOrganizationParams = zod.object({
  "slug": zod.string()
})

export const getOrganizationResponse = zod.object({
  "organization": zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "slug": zod.string(),
  "domain": zod.string().nullish(),
  "avatarUrl": zod.string().url().nullish(),
  "shouldAttachUsersByDomain": zod.boolean().optional(),
  "ownerId": zod.string().uuid(),
  "createdAt": zod.string().datetime(),
  "updatedAt": zod.string().datetime()
})
})

/**
 * @summary Update organization details
 */
export const updateOrganizationParams = zod.object({
  "slug": zod.string()
})

export const updateOrganizationBody = zod.object({
  "name": zod.string(),
  "domain": zod.string().nullish(),
  "shouldAttachUsersByDomain": zod.boolean().optional()
})

/**
 * @summary Shutdown organization
 */
export const shutdownOrganizationParams = zod.object({
  "slug": zod.string()
})

/**
 * @summary Get organizations where user is a member
 */
export const getOrganizationsResponse = zod.object({
  "organizations": zod.array(zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "slug": zod.string(),
  "domain": zod.string().nullish(),
  "avatarUrl": zod.string().url().nullish(),
  "role": zod.enum(['ADMIN']).or(zod.enum(['MEMBER'])).or(zod.enum(['BILLING']))
}))
})

/**
 * @summary Create an new organization
 */
export const createOrganizationBody = zod.object({
  "name": zod.string(),
  "domain": zod.string().nullish(),
  "shouldAttachUsersByDomain": zod.boolean().optional()
})

/**
 * @summary Get user membership on organization
 */
export const getMembershipParams = zod.object({
  "slug": zod.string()
})

export const getMembershipResponse = zod.object({
  "membership": zod.object({
  "id": zod.string(),
  "organizationId": zod.string(),
  "role": zod.enum(['ADMIN']).or(zod.enum(['MEMBER'])).or(zod.enum(['BILLING'])),
  "userId": zod.string().uuid()
})
})

/**
 * @summary Transfer organization ownership
 */
export const transferOrganizationParams = zod.object({
  "slug": zod.string()
})

export const transferOrganizationBody = zod.object({
  "transferToUserId": zod.string().uuid()
})

