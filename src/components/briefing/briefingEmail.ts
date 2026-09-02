export type BriefingFormData = {
  companyName: string
  contactName: string
  contactEmail: string
  contactPhone: string
  siteContactData: string
  hasDomain: string
  domainNames: string
  siteType: string
  features: string
  logoStatus: string
  brandColors: string
  referenceSite1: string
  referenceSite1Notes: string
  referenceSite2: string
  referenceSite2Notes: string
  aboutCompany: string
  materialsDeadline: string
  launchDate: string
  filesLink: string
}

type Translate = (key: string, params?: Record<string, string | number>) => string

type Field = {
  label: string
  value: string
  /** Torna o valor clicável no e-mail (mailto:, tel:, https:). */
  href?: string
  /** Campos longos (textarea) ganham bloco próprio em vez de linha. */
  block?: boolean
}

type Section = {
  title: string
  fields: Field[]
}

const BRAND = '#76c046'
const INK = '#1a1f17'
const MUTED = '#8a908a'
const LINE = '#e3e6e1'
const PAPER = '#ffffff'
const CANVAS = '#f4f5f4'

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char] as string,
  )
}

function toHtmlText(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br />')
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

/** Monta as seções do briefing, descartando todo campo que o cliente deixou em branco. */
function buildSections(form: BriefingFormData, t: Translate): Section[] {
  const label = (key: string) => t(`briefing.emailLabels.${key}`)
  const option = (group: string, key: string) => (key ? t(`briefing.${group}.${key}`) : '')

  const contactParts = [form.contactName, form.contactEmail, form.contactPhone]
    .map((part) => part.trim())
    .filter(Boolean)

  const sections: Section[] = [
    {
      title: t('briefing.sections.company'),
      fields: [
        { label: label('company'), value: form.companyName },
        { label: label('contact'), value: contactParts.join(' · ') },
        {
          label: label('siteContact'),
          value: form.siteContactData,
          block: true,
        },
      ],
    },
    {
      title: t('briefing.sections.project'),
      fields: [
        { label: label('domain'), value: option('hasDomainOptions', form.hasDomain) },
        { label: label('domainNames'), value: form.domainNames },
        { label: label('siteType'), value: option('siteTypes', form.siteType) },
        { label: label('features'), value: form.features, block: true },
      ],
    },
    {
      title: t('briefing.sections.brand'),
      fields: [
        { label: label('logo'), value: option('logoStatusOptions', form.logoStatus) },
        { label: label('colors'), value: form.brandColors },
        {
          label: label('reference1'),
          value: form.referenceSite1,
          href: normalizeUrl(form.referenceSite1),
        },
        { label: label('reference1Notes'), value: form.referenceSite1Notes, block: true },
        {
          label: label('reference2'),
          value: form.referenceSite2,
          href: normalizeUrl(form.referenceSite2),
        },
        { label: label('reference2Notes'), value: form.referenceSite2Notes, block: true },
        { label: label('about'), value: form.aboutCompany, block: true },
        { label: label('materials'), value: form.materialsDeadline },
        { label: label('launch'), value: form.launchDate },
        {
          label: label('filesLink'),
          value: form.filesLink,
          href: normalizeUrl(form.filesLink),
        },
      ],
    },
  ]

  return sections
    .map((section) => ({
      ...section,
      fields: section.fields
        .map((field) => ({ ...field, value: field.value.trim() }))
        .filter((field) => field.value),
    }))
    .filter((section) => section.fields.length)
}

function renderText(form: BriefingFormData, sections: Section[], t: Translate): string {
  const lines: string[] = [t('briefing.emailHeader'), '']

  for (const section of sections) {
    lines.push(section.title.toUpperCase())
    lines.push('-'.repeat(Math.max(section.title.length, 24)))

    for (const field of section.fields) {
      if (field.block && field.value.includes('\n')) {
        lines.push(`${field.label}:`)
        lines.push(...field.value.split(/\r?\n/).map((line) => `  ${line}`))
      } else {
        lines.push(`${field.label}: ${field.value}`)
      }
    }

    lines.push('')
  }

  const reply = form.contactEmail.trim()
  if (reply) lines.push(`${t('briefing.emailLabels.contact')}: ${reply}`)

  return lines.join('\n').trimEnd()
}

function renderFieldHtml(field: Field): string {
  const value = field.href
    ? `<a href="${escapeHtml(field.href)}" style="color:${BRAND};text-decoration:underline;word-break:break-all">${escapeHtml(field.value)}</a>`
    : toHtmlText(field.value)

  if (field.block) {
    return `
      <tr>
        <td style="padding:0 32px 18px">
          <div style="font:600 11px/1.4 ${FONT};letter-spacing:.08em;text-transform:uppercase;color:${MUTED};padding-bottom:6px">${escapeHtml(field.label)}</div>
          <div style="font:400 15px/1.6 ${FONT};color:${INK};background:${CANVAS};border-left:3px solid ${BRAND};border-radius:0 6px 6px 0;padding:12px 14px">${value}</div>
        </td>
      </tr>`
  }

  return `
      <tr>
        <td style="padding:0 32px 14px">
          <div style="font:600 11px/1.4 ${FONT};letter-spacing:.08em;text-transform:uppercase;color:${MUTED};padding-bottom:3px">${escapeHtml(field.label)}</div>
          <div style="font:400 16px/1.5 ${FONT};color:${INK}">${value}</div>
        </td>
      </tr>`
}

function renderSectionHtml(section: Section): string {
  return `
      <tr>
        <td style="padding:26px 32px 14px">
          <div style="font:700 11px/1.4 ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${BRAND};border-bottom:1px solid ${LINE};padding-bottom:10px">${escapeHtml(section.title)}</div>
        </td>
      </tr>${section.fields.map(renderFieldHtml).join('')}`
}

function renderHtml(form: BriefingFormData, sections: Section[], t: Translate): string {
  const company = form.companyName.trim() || t('briefing.companyName')
  const contact = form.contactName.trim()
  const email = form.contactEmail.trim()

  const replyButton = email
    ? `
      <tr>
        <td style="padding:8px 32px 32px">
          <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`${t('briefing.emailSubjectPrefix')} ${company}`)}"
             style="display:inline-block;background:${BRAND};color:${INK};font:700 14px/1 ${FONT};text-decoration:none;padding:14px 24px;border-radius:8px">
            ${escapeHtml(t('briefing.emailReplyCta', { name: contact || company }))}
          </a>
        </td>
      </tr>`
    : ''

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${CANVAS};margin:0;padding:0">
  <tr>
    <td align="center" style="padding:28px 12px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${PAPER};border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(26,31,23,.08)">
        <tr>
          <td style="background:${INK};padding:28px 32px">
            <div style="font:700 11px/1.4 ${FONT};letter-spacing:.16em;text-transform:uppercase;color:${BRAND}">${escapeHtml(t('briefing.emailBadge'))}</div>
            <div style="font:700 24px/1.3 ${FONT};color:#ffffff;padding-top:6px">${escapeHtml(company)}</div>
            ${contact ? `<div style="font:400 14px/1.5 ${FONT};color:rgba(255,255,255,.62);padding-top:4px">${escapeHtml(contact)}</div>` : ''}
          </td>
        </tr>${sections.map(renderSectionHtml).join('')}${replyButton}
        <tr>
          <td style="border-top:1px solid ${LINE};padding:18px 32px;font:400 12px/1.6 ${FONT};color:${MUTED}">
            ${escapeHtml(t('briefing.emailFooter'))}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`
}

export function buildBriefingEmail(
  form: BriefingFormData,
  t: Translate,
): { subject: string; text: string; html: string } {
  const sections = buildSections(form, t)

  return {
    subject: `${t('briefing.emailSubjectPrefix')} ${form.companyName.trim()}`.trim(),
    text: renderText(form, sections, t),
    html: renderHtml(form, sections, t),
  }
}
