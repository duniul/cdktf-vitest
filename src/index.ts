import { CdktfVitestMatchers } from './cdktfVitest.js';

export { setupCdktfVitest, type TerraformConstructorLike } from './cdktfVitest.js';
export { CdktfVitestMatchers as CdktfVitestMatchers };

// Extends vitest's expect types.
// See https://vitest.dev/guide/extending-matchers.html
declare module 'vitest' {
  interface Assertion<T = any> extends CdktfVitestMatchers<T> {}
  interface AsymmetricMatchersContaining extends CdktfVitestMatchers {}
}
