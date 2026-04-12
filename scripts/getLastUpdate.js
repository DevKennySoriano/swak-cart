import { execSync } from 'child_process'

// Get the last commit date from git
function getLastUpdateDate() {
  try {
    // Get the last push date (last commit date)
    const lastCommitDate = execSync('git log -1 --format=%ai', {
      encoding: 'utf-8',
      cwd: process.cwd()
    }).trim()

    if (!lastCommitDate) {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // Parse the date and format it
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

export default getLastUpdateDate()
