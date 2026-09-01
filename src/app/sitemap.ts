import { MetadataRoute } from 'next'
import { allCaseStudies } from '../lib/projectsData'

const BASE = 'https://byrishav.online'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: BASE,
      lastModified,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...allCaseStudies.map((caseStudy) => ({
      url: `${BASE}/projects/${caseStudy.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
