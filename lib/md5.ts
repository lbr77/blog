import crypto from "node:crypto"
export function md5(x: string) {
    return crypto.createHash("md5").update(x).digest("hex")
}