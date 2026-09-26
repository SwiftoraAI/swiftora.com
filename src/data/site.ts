import settings from './site.json';
import rawContent from './content.json';
import product from './product.json';
import rawGuides from './guides.json';

export const site = settings;
export { product };
const linkDestinations: Record<string, string> = {
  appStore: site.appStoreUrl,
  support: `mailto:${site.supportEmail}`,
  appPrivacy: site.appPrivacyUrl,
  terms: site.termsUrl,
  githubPrivacy: site.githubPrivacyUrl,
};
export type Action = { label: string; href?: string; linkKey?: string };
export type Item = { heading: string; body: string };
export type Section = { id?: string; eyebrow?: string; heading: string; body?: string; ordered?: boolean; items?: Item[]; action?: Action; links?: Action[] };
export type PageCopy = { path: string; title: string; description: string; eyebrow: string; heading: string; headingAccent?: string; intro: string; updated?: string; primaryAction?: Action; secondaryAction?: Action; sections: Section[] };
export type GuideSection = { id: string; heading: string; body?: string; paragraphs?: string[]; items?: Item[]; list?: string[]; table?: { caption: string; columns: string[]; rows: string[][] } };
export type Guide = { slug: string; title: string; description: string; eyebrow: string; heading: string; intro: string; readTime?: string; sections: GuideSection[]; relatedSlugs: string[] };
export const guides = rawGuides as Guide[];
export const guidePath = (guide: Guide) => `/guides/${guide.slug}.html`;
export function href(action: Action) {
  if (action.linkKey && !linkDestinations[action.linkKey]) throw new Error(`Unknown destination: ${action.linkKey}`);
  return action.href ?? linkDestinations[action.linkKey ?? ''] ?? '/';
}

function resolveCopy(value: unknown): unknown {
  if (typeof value === 'string') return value.replaceAll('{{supportEmail}}', site.supportEmail).replaceAll('{{operator}}', site.operator);
  if (Array.isArray(value)) return value.map(resolveCopy);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveCopy(item)]));
  return value;
}
export const content = resolveCopy(rawContent) as typeof rawContent;
export const pages = content.pages as Record<string, PageCopy>;
export const routes = Object.entries(pages).filter(([key]) => key !== 'home');
export const indexableRoutes = ['/', '/demo.html', '/pricing.html', '/about.html', '/support.html', '/privacy.html', '/guides.html', ...guides.map(guidePath)];
