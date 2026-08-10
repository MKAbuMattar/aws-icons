import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// react-native-svg needs a native runtime, so this asserts the generated
// output instead of rendering. The core compiles under tsc in CI.
const dist = path.resolve(import.meta.dirname, '../dist');

const rocket = fs.readFileSync(
  path.join(dist, 'architecture-service/icons/amazon-ec2.js'),
  'utf8',
);
assert.ok(
  rocket.includes("createAwsIcon} from '../../core.js'"),
  'imports core',
);
assert.ok(rocket.includes('createAwsIcon("AmazonEc2"'), 'named factory call');
assert.ok(rocket.includes('<svg'), 'carries full svg xml');
assert.ok(rocket.includes('export default AmazonEc2'), 'default export');

const dts = fs.readFileSync(
  path.join(dist, 'architecture-service/icons/amazon-ec2.d.ts'),
  'utf8',
);
assert.ok(dts.includes('AwsIconComponent'), 'typed');

const core = fs.readFileSync(path.join(dist, 'core.js'), 'utf8');
assert.ok(core.includes('react-native-svg'), 'core built');

const index = fs.readFileSync(path.join(dist, 'resource/index.js'), 'utf8');
assert.ok(index.split('\n').length > 250, 'barrel covers all icons');

console.log('@aws-icons/react-native smoke test passed');
