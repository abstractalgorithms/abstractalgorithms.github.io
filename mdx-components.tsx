import type { MDXComponents } from 'mdx/types'
import SeriesNav from './src/components/SeriesNav'
import SeriesPanelNav from './src/components/SeriesPanelNav'
import SeriesNavigation from './src/components/SeriesNavigation'
import FloatingSeriesNav from './src/components/FloatingSeriesNav'
import InlineSeriesNav from './src/components/InlineSeriesNav'
import SidebarSeriesNav from './src/components/SidebarSeriesNav'
import TopSeriesNav from './src/components/TopSeriesNav'
import QuickSeriesNav from './src/components/QuickSeriesNav'
import GiscusComments from './src/components/GiscusComments'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components available in MDX
    SeriesNav,
    SeriesPanelNav,
    SeriesNavigation,
    FloatingSeriesNav,
    InlineSeriesNav,
    SidebarSeriesNav,
    TopSeriesNav,
    QuickSeriesNav,
    GiscusComments,
    ...components,
  }
}
