import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { execa } from 'execa'
import chalk from 'chalk'
import inquirer from 'inquirer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templateDir = path.resolve(__dirname, './template')

export async function createProject(projectName) {
  // 没传项目名？询问用户输入
  if (!projectName) {
    const res = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称：',
        validate: (input) => {
          if (!input.trim()) return '项目名称不能为空'
          return true
        },
      },
    ])
    projectName = res.projectName.trim()
  }

  const targetDir = path.resolve(process.cwd(), projectName)

  // 检查目录是否已存在
  if (fs.existsSync(targetDir)) {
    console.log(chalk.red(`❌ 目录 "${projectName}" 已存在，请更换项目名`))
    process.exit(1)
  }

  console.log(chalk.cyan(`🚀 创建项目: ${projectName}`))

  // 拷贝模板文件夹
  await fs.copy(templateDir, targetDir)
  console.log(chalk.green('✅ 项目文件复制完成'))

  // 修改 package.json 中的 name 字段
  const pkgPath = path.join(targetDir, 'package.json')
  const pkg = await fs.readJson(pkgPath)
  pkg.name = projectName
  await fs.writeJson(pkgPath, pkg, { spaces: 2 })

  // 修改 index.html 的 <title>
  const indexHtmlPath = path.join(targetDir, 'index.html')
  if (await fs.pathExists(indexHtmlPath)) {
    let html = await fs.readFile(indexHtmlPath, 'utf-8')
    html = html.replace(/<title>(.*?)<\/title>/, `<title>${projectName}</title>`)
    await fs.writeFile(indexHtmlPath, html, 'utf-8')
  }

  // 安装依赖
  console.log(chalk.cyan('📦 正在安装依赖...'))
  await execa('pnpm', ['install'], { cwd: targetDir, stdio: 'inherit' })

  console.log(chalk.green('🎉 项目初始化完成'))
  console.log(chalk.yellow(`👉 cd ${projectName} && pnpm dev`))
}
