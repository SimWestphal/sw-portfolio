import { defineQuery } from "next-sanity";

// export const PAGE_QUERY = defineQuery(`
//   *[_type == "page" && slug.current == $slug && language == $language][0]{
//   _id, title, body, language,
//   "slug": slug.current,
//   "baseId": select(
//     _id in path("drafts.**") => string::split(_id, ".")[1],
//     _id
//   ),
//   "translations": *[
//     _type == "translation.metadata" && references(^.baseId)
//   ].translations[].value->{
//       language, "slug": slug.current
//     }[defined(slug)]
//   }
// `);

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type in ["legalPage"]
    && slug.current == $slug
    && language == $language][0]{
    _id,
    _type,
    title,
    body,
    language,
    "slug": slug.current,
    "translations": *[
      _type == "translation.metadata" && references(^._id)
    ].translations[].value->{
      language,
      "slug": slug.current
    }[defined(slug)]
  }
`);

export const LEGAL_PAGE_PARAMS_QUERY = defineQuery(`
  *[_type in ["legalPage"] && defined(slug.current)]{
    "slug": slug.current,
    language
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation" && language == $language]{
    _id,
    name,
    language,
    navigationItem[]{
      name,
      icon,
      linkType,
      anchorLink,
      internalLink->{ _id, title, "slug": slug.current }
    },
    "translations": *[
      _type == "translation.metadata" && references(^._id)
    ].translations[].value->{
      language
    }
  }
`);

export const TRANSLATIONS_QUERY = defineQuery(`
  *[_type in ["legalPage"] && slug.current == $slug && language == $language][0]{
    language,
    "slug": slug.current,
    "translations": *[
      _type == "translation.metadata" && references(^._id)
    ].translations[].value->{ language, "slug": slug.current }
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type in ["project"] ] {
    _id,
    "name":name[language == $language][0].value,
    "shortDescription":shortDescription[language == $language][0].value,
    "skills":skills[]-> {
        _id,
        "name":name[language == $language][0].value,
    },
    category,
    "description":description[language == $language][0].value,
    "company":name[language == $language][0].value,
    "role":name[language == $language][0].value,
    projectStart,
    projectEnd
  }
`);
