import { copyFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const projectRoot = join(__dirname, '..')
const sourcePath = join(projectRoot, 'public', 'sitemap.xml')
const targetPath = join(projectRoot, 'dist', 'sitemap.xml')

async function copySitemap() {
  try {
    // dist 폴더가 없으면 생성
    await mkdir(join(projectRoot, 'dist'), { recursive: true })

    // sitemap.xml 복사
    await copyFile(sourcePath, targetPath)
    console.log('✅ sitemap.xml이 dist 폴더로 복사되었습니다.')
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
    console.error('❌ sitemap 복사 중 오류가 발생했습니다:', message)
  }
}

copySitemap()
