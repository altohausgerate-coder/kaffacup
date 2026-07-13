export function generatePromoCode(email) {
  let hash = 0
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash + email.charCodeAt(i)) | 0
  }
  const abs = Math.abs(hash)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  let n = abs
  for (let i = 0; i < 5; i++) {
    code += chars[n % chars.length]
    n = Math.floor(n / chars.length)
  }
  return 'KAFFA-' + code
}

export function validatePromoCode(email, code) {
  return generatePromoCode(email.trim().toLowerCase()) === code.trim().toUpperCase()
}
