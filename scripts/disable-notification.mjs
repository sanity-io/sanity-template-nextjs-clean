import {readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'

const filePath = resolve(process.cwd(), 'sanity-template.json')

try {
  const data = JSON.parse(readFileSync(filePath, 'utf-8'))
  if (data.notification) {
    data.notification.enabled = false
  }
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  console.log('Notification disabled in sanity-template.json')
  console.log('Restart the dev server for this change to take effect.')
} catch (err) {
  console.error('Could not disable notification:', err.message)
  process.exit(1)
}
