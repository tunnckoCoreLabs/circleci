import proc from 'process';
import test from 'asia';
import circleci from '../src';

test('should throw if not repository are given', async (t) => {
  try {
    await circleci({ token: proc.env.CIRCLECI_TOKEN });
  } catch (err) {
    t.ok(err);
    t.strictEqual(err.response.status, 404);
  }
});

test('should throw if token not given', async (t) => {
  try {
    await circleci({ repository: 'tunnckoCoreLabs/circleci' });
  } catch (err) {
    t.ok(err);
    t.ok(err.message.includes('expect a CircleCI token'));
  }
});
