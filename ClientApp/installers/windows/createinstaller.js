const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig() {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'DailyToDoList-win32-x64/'),
    authors: 'Krystian Skwierawski',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'DailyToDoList.exe',
    setupExe: 'Install_DailyToDoList.exe',
    setupIcon: path.join(rootPath, 'dist', 'assets', 'icon.ico')
  })
}
