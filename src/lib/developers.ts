export type DeveloperProfile = {
  name: string
  role: string
  avatar?: string
  github?: string
  linkedin?: string
  portfolio?: string
  country: string
}

type ParseResult =
  | { ok: true; value: DeveloperProfile }
  | { ok: false; error: string }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null
}

function asOptionalUrl(value: unknown): string | undefined {
  const str = asNonEmptyString(value)
  if (!str) return undefined
  // Accept path-only values (e.g. "/hasnain.png" from public folder)
  if (str.startsWith('/') || str.startsWith('./')) return str
  // Prepend https:// if no protocol (e.g. "www.linkedin.com/in/..." -> "https://www.linkedin.com/in/...")
  const withProtocol = /^https?:\/\//i.test(str) ? str : `https://${str}`
  try {
    // eslint-disable-next-line no-new
    new URL(withProtocol)
    return withProtocol
  } catch {
    return undefined
  }
}

function parseDeveloperProfile(raw: unknown, source: string): ParseResult {
  if (!isRecord(raw)) return { ok: false, error: `${source}: not a JSON object` }

  const name = asNonEmptyString(raw.name)
  const role = asNonEmptyString(raw.role)
  const country = asNonEmptyString(raw.country)

  if (!name) return { ok: false, error: `${source}: missing/invalid "name"` }
  if (!role) return { ok: false, error: `${source}: missing/invalid "role"` }
  if (!country) return { ok: false, error: `${source}: missing/invalid "country"` }

  return {
    ok: true,
    value: {
      name,
      role,
      country,
      avatar: asOptionalUrl(raw.avatar),
      github: asOptionalUrl(raw.github),
      linkedin: asOptionalUrl(raw.linkedin),
      portfolio: asOptionalUrl(raw.portfolio),
    },
  }
}

export function loadDeveloperProfiles(): {
  profiles: DeveloperProfile[]
  errors: string[]
} {
  // Vite resolves absolute globs from project root.
  const modules = import.meta.glob('/developers/*.json', { eager: true })

  const profiles: DeveloperProfile[] = []
  const errors: string[] = []

  for (const [path, mod] of Object.entries(modules)) {
    const raw = (mod as { default?: unknown }).default ?? mod
    const result = parseDeveloperProfile(raw, path)
    if (result.ok) profiles.push(result.value)
    else errors.push(result.error)
  }

  profiles.sort((a, b) => a.name.localeCompare(b.name))

  return { profiles, errors }
}

