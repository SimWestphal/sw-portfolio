import {blogPostIndex} from './blogPostIndexType'
import {blogPost} from './blogPostType'
import {company} from './companyType'
import {legalPage} from './legalPageType'
import {locale} from './localeType'
import {navigation} from './navigationType'
import {projectCategory} from './projectCategoryType'
import {project} from './projectType'
import {role} from './roleType'
import {siteSettings} from './siteSettingsType'
import {skillCategory} from './skillCategoryType'
import {skill} from './skillType'
export const schemaTypes = [
  locale,
  project,
  company,
  role,
  skill,
  projectCategory,
  skillCategory,
  legalPage,
  navigation,
  siteSettings,
  blogPost,
  blogPostIndex,
]
