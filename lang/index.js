#!/usr/bin/env node
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const token = "5de0721ace5b35853d41db6c3cbc3550ac65dd94";  

const [name] = process.argv.slice(2);
const user = String.raw`\"${name}\"`;

function makeCurl(cursor) {
  return `curl -i -H 'Content-Type: application/json' -H "Authorization: bearer ${token}" -X POST -d '{ "query" : "query {user(login: ${user}) { repositories(first: 100, orderBy: { field: NAME, direction: ASC} ${cursor || ""}) { pageInfo { hasNextPage endCursor } nodes { languages(first: 100) { edges { size node { name color } } } } } } }" }' https://api.github.com/graphql`;
}

function retrieveData(output) {
  const rawData = output.split('\n').filter(e => e);
  const data = JSON.parse(rawData[rawData.length -1]);
  return data;
}

async function handleRequest() {
  let flag = true;
  let allNodes = [];
  let currentCursor = null;
  while(flag) {
    try {
      const curl = makeCurl(currentCursor);
      const {err, stdout, stderr} = await exec(curl);
    if (err) throw new Error(err);
    const results = retrieveData(stdout);
    const {errors= null} = results;
    if (errors) {
      errors.forEach(error => console.log("❌ ", error.message))
      allNodes = null
      break;
    }
    const {
      pageInfo: { hasNextPage, endCursor },
      nodes,
    } = results.data.user.repositories;
    if (!nodes.length) {
      break; 
    }
    allNodes = [...allNodes, ...nodes];
    currentCursor = String.raw`, after : \"${endCursor}\"`;
    if (!hasNextPage) 
      flag = hasNextPage;
    } catch (err) {
      return console.log(err);
    }
  }
  
  return allNodes;
}

function parseAndPrint(nodes) {
  const totalCount = nodes.length
  const userRepoLanguages = nodes.reduce((acc, { languages: { edges } }) => {
    edges.forEach((e) => {
      const a = { ...e.node, size: e.size };
      const registerIndex = acc.findIndex((l) => l.name === a.name);
      if (registerIndex > -1) acc[registerIndex].size += a.size;
      else acc.push(a);
    });
    return acc;
  }, []);
  console.log(`***** Languages collected over ${totalCount} repositories ****`);
  const b = userRepoLanguages.sort((a, b) => b.size -a.size);
  b.forEach(bb =>  console.log(`- Language: ${bb.name} : Bytes size ${bb.size}`))
}

async function main() {
  const d = await handleRequest();
  if (!d) return;
  if (d.length === 0) return console.log(`User ${name} has 0 repositories 🤷‍♂️`)
 parseAndPrint(d);
 }

main();