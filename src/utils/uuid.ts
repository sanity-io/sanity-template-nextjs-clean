import nodeCrypto from 'crypto'

export function createRandomUUID() {
  if (typeof crypto !== 'undefined') {
    return crypto.randomUUID()
  }

  return nodeCrypto.randomUUID()
}
