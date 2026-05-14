/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'hlpr'

const ALERT_LABELS: Record<string, string> = {
  first_impressions: 'New page indexed by Google',
  crossed_100: 'Page crossed 100 impressions',
  clicks_drop: 'Clicks dropped sharply',
  low_ctr: 'Low CTR — title/meta needs work',
}

interface SeoAlertProps {
  alertType?: string
  page?: string
  message?: string
  metricValue?: number | string | null
  dashboardUrl?: string
}

const SeoAlertEmail = ({
  alertType = 'first_impressions',
  page = 'https://audit.hlpr.io/',
  message = 'A new page has started showing in Google search.',
  metricValue,
  dashboardUrl = 'https://audit.hlpr.io/dashboard/seo',
}: SeoAlertProps) => {
  const label = ALERT_LABELS[alertType] || 'SEO update'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{label}: {page}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={badge}>SEO ALERT</Text>
          <Heading style={h1}>{label}</Heading>
          <Section style={card}>
            <Text style={labelText}>Page</Text>
            <Text style={pageText}>{page}</Text>
            <Hr style={hr} />
            <Text style={labelText}>What happened</Text>
            <Text style={text}>{message}</Text>
            {metricValue !== undefined && metricValue !== null && (
              <>
                <Hr style={hr} />
                <Text style={labelText}>Metric</Text>
                <Text style={metricText}>{String(metricValue)}</Text>
              </>
            )}
          </Section>
          <Section style={{ textAlign: 'center', margin: '32px 0' }}>
            <Button href={dashboardUrl} style={button}>
              View dashboard
            </Button>
          </Section>
          <Text style={footer}>
            You're receiving this because you're the admin of {SITE_NAME}.{' '}
            <Link href={dashboardUrl} style={footerLink}>Open the SEO dashboard</Link>.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: SeoAlertEmail,
  subject: (data: Record<string, any>) => {
    const label = ALERT_LABELS[data?.alertType] || 'SEO update'
    return `[hlpr SEO] ${label}`
  },
  displayName: 'SEO alert',
  previewData: {
    alertType: 'crossed_100',
    page: 'https://audit.hlpr.io/cro-audit-shopify-stores',
    message: 'Page crossed 100 impressions (30-day)',
    metricValue: 142,
    dashboardUrl: 'https://audit.hlpr.io/dashboard/seo',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const badge = { fontSize: '11px', fontWeight: 'bold' as const, letterSpacing: '1.5px', color: '#2563eb', margin: '0 0 8px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0 0 24px', lineHeight: '1.3' }
const card = { backgroundColor: '#f8fafc', borderRadius: '8px', padding: '20px 24px', border: '1px solid #e2e8f0' }
const labelText = { fontSize: '11px', fontWeight: 'bold' as const, letterSpacing: '0.5px', textTransform: 'uppercase' as const, color: '#64748b', margin: '0 0 4px' }
const pageText = { fontSize: '14px', color: '#0f172a', margin: '0 0 4px', wordBreak: 'break-all' as const, fontFamily: 'ui-monospace, Menlo, monospace' }
const text = { fontSize: '15px', color: '#334155', lineHeight: '1.5', margin: '0' }
const metricText = { fontSize: '20px', fontWeight: 'bold' as const, color: '#0f172a', margin: '0' }
const hr = { borderColor: '#e2e8f0', margin: '16px 0' }
const button = { backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' as const, textDecoration: 'none', display: 'inline-block' }
const footer = { fontSize: '12px', color: '#94a3b8', margin: '24px 0 0', textAlign: 'center' as const }
const footerLink = { color: '#2563eb', textDecoration: 'underline' }
