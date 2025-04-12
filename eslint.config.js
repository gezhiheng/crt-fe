import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  ignores: [
    '.DS_Store',
    'node_modules',
    'coverage',
    'dist',
    '.env.local',
    '.env.*.local',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    'pnpm-debug.log*',
    '.idea',
    '.vscode',
    '*.suo',
    '*.ntvs*',
    '*.njsproj',
    '*.sln',
    '*.sw?',
  ],
})
