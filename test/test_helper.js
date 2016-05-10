import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

export function getIn(promise, f) {
  return promise.then((a, b, c, d, e) => {
    return new Promise(
      (resolve) => resolve(f(a, b, c, d, e))
    );
  });
}

export function equal(actual, expected, message) {
  return chai
    .expect(actual)
    .to.eventually.equal(expected, message);
}
