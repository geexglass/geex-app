import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface SanitySlug {
  _type: 'slug'
  current: string
}
export interface MenuItem {
  _type: string
  slug?: SanitySlug
  title?: string
}

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface GEventPayload {
  _id: string
  description?: PortableTextBlock[]
  end?: string
  image?: Image
  organizers?: string[]
  start?: string
  summary?: string
  tags?: string[]
  name?: string
  url?: string
  venue?: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
