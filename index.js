// const core = require('@actions/core');
// const fs = require('fs');
const github = require('@actions/github');

// const fileName = core.getInput('file-name') || '.env';
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);

    const secrets = octokit.rest.actions.listRepoSecrets({
      owner,
      repo,
    });

    console.log(secrets);
    core.setOutput('secrets', secrets);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

// try {

//   // let envFileContent = '';

//   // Object.keys(process.env).forEach(function (key) {
//   //   if (key.startsWith(inputPrefix)) {
//   //     envFileContent += `${key.substring(inputPrefix.length)}=${
//   //       process.env[key]
//   //     }\n`;
//   //   }
//   // });

//   // fs.writeFile(fileName, envFileContent, function (error) {
//   //   if (error) {
//   //     core.setFailed(error.message);
//   //   }
//   // });
// } catch (error) {
//   core.setFailed(error.message);
// }
