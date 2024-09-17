// ./deskStructure.js
import {CogIcon} from '@sanity/icons'

export const structure = (S: any) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems().filter(
        (listItem: any) => !['settings'].includes(listItem.getId()),
      ),
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
