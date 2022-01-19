const { exec } = require('child_process');

async function getAllGitmojis() {
  exec(`git log --author=nterol --pretty=format:"%s"`, (err, stdout) => {
    if (err) return console.log(err);
    const i = stdout
      .split('\n')
      .map(log => log.slice(0, 2))
      .map(e => (e === 'Me' ? '🔀' : e));

    const g = i.reduce((acc, curr) => {
      acc[`${curr.trim()}`] = acc[curr] ? (acc[curr] += 1) : 1;
      return acc;
    }, {});

    console.log(g);

    return g;
  });
}

getAllGitmojis();
