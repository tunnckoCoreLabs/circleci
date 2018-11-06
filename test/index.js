import test from 'asia';
import circleci from '../src';

test('should throw if not token and not repository are given', async (t) => {
  try {
    await circleci();
  } catch (err) {
    t.ok(err);
    t.ok(err.message.includes('Request failed with status code 404'));
  }
});

test('should throw if token not given', async (t) => {
  try {
    await circleci({ repository: 'tunnckoCoreLabs/circleci' });
  } catch (err) {
    t.ok(err);
    t.ok(err.message.includes('circleci: expect a CircleCI token'));
  }
});
