import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Patch AdminJS Prisma to handle ES modules properly
const patchFile = path.join(__dirname, '../node_modules/@adminjs/prisma/lib/utils/get-enums.js')

if (fs.existsSync(patchFile)) {
  let content = fs.readFileSync(patchFile, 'utf8')
  
  // Replace named import with default import
  if (content.includes("import { Prisma } from '@prisma/client'")) {
    content = content.replace(
      "import { Prisma } from '@prisma/client'",
      "import pkg from '@prisma/client'\nconst { Prisma } = pkg"
    )
    
    fs.writeFileSync(patchFile, content)
    console.log('✅ Patched AdminJS Prisma for ES module compatibility')
  }
} else {
  console.log('⚠️  AdminJS Prisma patch file not found, skipping patch')
}
