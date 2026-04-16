import { createCipheriv, createDecipheriv, createHash } from 'crypto';

const ALGORITHM = 'aes-256-ctr';

// Pega a chave do ENV ou uma fallback
const RAW_KEY = process.env.SECRET!;

// FAZ O HASH DA CHAVE: Isso garante que 'KEY' tenha sempre 32 bytes
const KEY = createHash('sha256').update(RAW_KEY).digest();

// O IV para AES-CTR deve ter 16 bytes
const IV = createHash('md5').update(RAW_KEY).digest();

export function encrypt(text: string): string {
  if (!text) return text;
  const cipher = createCipheriv(ALGORITHM, KEY, IV);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString('hex');
}

export function decrypt(hash: string): string {
  if (!hash) return hash;
  try {
    const decipher = createDecipheriv(ALGORITHM, KEY, IV);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hash, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString();
  } catch (error) {
    // Se falhar (ex: dado não está criptografado no banco), retorna o original
    return hash;
  }
}
