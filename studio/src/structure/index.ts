// ./deskStructure.js
import {CogIcon} from '@sanity/icons'

export const structure = (S: any) =>
  S.list()
    .title('Website Content')
    .items([
      ...S.documentTypeListItems().filter(
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        (listItem: any) => !['settings', 'assist.instruction.context'].includes(listItem.getId()),
      ),
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
    ])
