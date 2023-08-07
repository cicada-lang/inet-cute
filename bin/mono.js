#!/usr/bin/env node

const process = require("process")

process.on("unhandledRejection", (error) => {
  console.error(error)
  process.exit(1)
})

const { createCommandRunner } = require("../lib/console")

createCommandRunner().run()
