const assert = require('assert');
const lcovParse = require('lcov-parse');
const coberturaParse = require('cobertura-parse');
const { stringify } = require('../src/index');

describe('LCOV write', function() {
  it('should be compatible with objects returned by lcov-parse', function(done) {
    lcovParse("test/assets/parts.info", (_, res) => {
      lcovParse.source(stringify(res), (_, res2) => {
        assert.deepEqual(res, res2);
        done();
      });
    });
  });

  it('should be compatible with objects returned by cobertura-parse', function(done) {
    const coberturaFiles = ['sample.xml', 'sample2.xml', 'sample3.xml', 'pureconfig.xml'];
    let filesChecked = 0;

    // cobertura.xml files dont have `branches.details[*]..block` IDs, so `cobertura-parse` does
    // not fill those fields. They are required in LCOV, so we always fill this with 0. in order
    // to be able to `deepEqual` the two, we remove that key.
    function fixObject(obj) {
      obj.forEach(tc => tc.branches.details.forEach(br => delete br.block));
    }

    coberturaFiles.forEach(file => {
      const path = `test/assets/${file}`;

      coberturaParse.parseFile(path, (_, res) => {
        lcovParse.source(stringify(res), (_, res2) => {
          fixObject(res2);
          assert.deepEqual(res, res2);

          filesChecked++;
          if(filesChecked === coberturaFiles.length) {
            done();
          }
        });
      });
    });
  });
});
