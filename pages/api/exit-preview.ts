import { NextApiRequest, NextApiResponse } from 'next'

export default function exitPreview(
  req: NextApiRequest,
  res: NextApiResponse<string | void>
) {
  res.clearPreviewData()
  res.writeHead(307, { Location: '/' })
  res.end()
}
