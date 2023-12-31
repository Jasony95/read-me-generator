const inquirer = require("inquirer");
const MarkdownIt = require("markdown-it");
const fs = require('fs');
const {unlink} = require('node:fs');
md = new MarkdownIt();
const { generateMarkdown, renderLicenseBadge, renderLicenseLink, renderLicenseSection } = require('./utils/generateMarkdown');
const questions = [
  {
    type: "default",
    name: "title",
    message: "What is the title of the README file?"
  },
  {
    type: "default",
    name: "description",
    message: "Please add a description of the project."
  },
  {
    type: "default",
    name: "installation",
    message: "Describe the installation process."
  },
  {
    type: "default",
    name: "usage",
    message: "What is the usage information?"
  },
  {
    type: "default",
    name: "contribution",
    message: "Any contribution?"
  },
  {
    type: "default",
    name: "test",
    message: "Any instructions to know to test the project?"
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license:",
    choices: ["Apache License 2.0", "GNU General Public License v3.0", "MIT License", `BSD 2-Clause "Simplied" License`, `BSD 3-Clause "New" or "Revised" License`, `Boost Software License 1.0`, `Creative Commons Zero v1.0 Universal`, `Eclipse Public License 1.0`, `GNU Affero General Public License v3.0`, `GNU General Public License v2.0`, `Mozilla Public License 2.0`, `The Unlicense`],
  },
  {
    type: "default",
    name: "username",
    message: "What is your GitHub username?"
  },
  {
    type: "default",
    name: "email",
    message: "Please provide an email:"
  },
]

function writeToFile(fileName, data) {
  fs.appendFile(fileName, data, (err) =>
    err ? console.error(err) : console.log('Committed to file.'));
}

function init() {
  inquirer.prompt(questions).then(data => {
    console.log(data);
    
    unlink('README.md', (err) => {
      err ? console.error(err) : console.log('Successfully deleted file.');
    })
    writeToFile('README.md', generateMarkdown(data));

  })

}

init();