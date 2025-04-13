#!/usr/bin/env node

import { Command } from 'commander'
import { createProject } from './create.js'

const program = new Command()

program
  .name('create-frontend')
  .description('Initialize a new frontend project from the starter template')
  .argument('<project-name>', 'Name of the new project')
  .action((projectName) => {
    createProject(projectName)
  })

program.parse()
