# cdktf-vitest

[![npm](https://img.shields.io/npm/v/cdktf-vitest.svg)](https://www.npmjs.com/package/cdktf-vitest)

🧪 _Terraform CDK's assertions for Vitest._

- [Vitest](https://vitest.dev/) assertions identical to `cdktf`'s [official Jest assertions](https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#add-testing-to-your-application).
- Works with both global and imported `expect`.

## Installation

```sh
npm install cdktf-vitest --save-dev
```

`cdktf-vitest` has peer dependencies on both [`cdktf`](https://www.npmjs.com/package/cdktf) and [`vitest`](https://www.npmjs.com/package/vitest), so remember to install those too!

## Usage

1. Import and call `setupCdktfVitest` in a [a setup file](https://vitest.dev/config/#setupfiles):

   ```ts
   // vitest.setup.ts or similar
   import { setupCdktfVitest } from 'cdktf-vitest';

   setupCdktfVitest();
   ```

2. Add `cdktf-vitest` to `types` in your `tsconfig.json`:

   ```js
   // tsconfig.json
   {
     "compilerOptions": {
       "types": ["cdktf-vitest"]
     }
   }
   ```

   <sup>❗️ If you don't set `types`, you'll need to add `import 'cdktf-vitest'` to the top of each test file.</sup>

3. Done! 🎉 The assertions should now be available from the`expect` function, like:

   ```ts
   import { expect } from 'vitest';

   expect(stack).toHaveResouce(resource);
   ```

   The assertions work exactly like Terraform CDK's official assertions for Jest. For information on how to use them, see [their documentation on unit testing with Jest](https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#write-assertions).
