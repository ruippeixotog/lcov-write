const fs = require('fs');

function stringify(content) {
  let lines = [];
  content.forEach(tc => {
    lines.push(`TN:${tc.title}`);
    lines.push(`SF:${tc.file}`);

    tc.functions.details.forEach(fn => {
      lines.push(`FN:${fn.line},${fn.name}`);
    });

    tc.functions.details.forEach(fn => {
      lines.push(`FNDA:${fn.hit},${fn.name}`);
    });
    lines.push(`FNF:${tc.functions.found}`);
    lines.push(`FNH:${tc.functions.hit}`);

    tc.branches.details.forEach(br => {
      lines.push(`BRDA:${br.line},${br.block || 0},${br.branch},${br.taken || '-'}`);
    });
    lines.push(`BRF:${tc.branches.found}`);
    lines.push(`BRH:${tc.branches.hit}`);

    tc.lines.details.forEach(br => {
      lines.push(`DA:${br.line},${br.hit}`);
    });
    lines.push(`LH:${tc.lines.hit}`);
    lines.push(`LF:${tc.lines.found}`);

    lines.push('end_of_record\n');
  });
  return lines.join("\n");
}

function write(content, file, cb) {
  fs.writeFile(file, stringify(content), cb);
}

module.exports = { write, stringify };
