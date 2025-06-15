import { remark } from 'remark'
import html from 'remark-html'

export const remarkHtml = remark().use(html) 