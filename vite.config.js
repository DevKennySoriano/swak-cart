import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Plugin to get last git commit date
function gitDatePlugin() {
  const virtualModuleId = 'virtual:git-date'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  function getLastUpdateDate() {
    try {
      const lastCommitDate = execSync('git log -1 --format=%ai', {
        encoding: 'utf-8'
      }).trim()

      if (!lastCommitDate) {
        return new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }

      const date = new Date(lastCommitDate)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      console.warn('Could not read git log:', error.message)
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }

  return {
    name: 'git-date',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const date = getLastUpdateDate()
        return `export default "${date}"`
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    gitDatePlugin(),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
