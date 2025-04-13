import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { execa } from 'execa'
import chalk from 'chalk'
import inquirer from 'inquirer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templateDir = path.resolve(__dirname, './template')

export async function createProject(projectName) {
  // 没传项目名？询问
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

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red(`❌ 目录 "${projectName}" 已存在，请更换项目名`))
    process.exit(1)
  }

  console.log(chalk.cyan(`🚀 创建项目: ${projectName}`))
  await fs.copy(templateDir, targetDir)

  console.log(chalk.green('✅ 项目文件复制完成'))
  console.log(chalk.cyan('📦 正在安装依赖...'))

  await execa('pnpm', ['install'], { cwd: targetDir, stdio: 'inherit' })

  console.log(chalk.green('🎉 项目初始化完成'))
  console.log(chalk.yellow(`👉 cd ${projectName} && pnpm dev`))
}
