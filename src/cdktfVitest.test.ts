import { TerraformMetaArguments, TerraformResource, Testing } from 'cdktf';
import { Construct } from 'constructs';
import { describe, expect, it } from 'vitest';
import { setupCdktfVitest } from './cdktfVitest.js';

describe(setupCdktfVitest.name, () => {
  it('extends imported `expect` with CDKTF matchers', () => {
    setupCdktfVitest();

    const assertion = expect(true);
    expect(assertion.toHaveResource).toBeTypeOf('function');
    expect(assertion.toHaveResourceWithProperties).toBeTypeOf('function');
    expect(assertion.toHaveDataSource).toBeTypeOf('function');
    expect(assertion.toHaveDataSourceWithProperties).toBeTypeOf('function');
    expect(assertion.toHaveProvider).toBeTypeOf('function');
    expect(assertion.toHaveProviderWithProperties).toBeTypeOf('function');
    expect(assertion.toBeValidTerraform).toBeTypeOf('function');
    expect(assertion.toPlanSuccessfully).toBeTypeOf('function');
  });

  it('fails with a Vitest error message', () => {
    setupCdktfVitest();

    const synthed = Testing.synthScope((stack) => {
      new TestResource(stack, 'test-resource-a', { name: 'foo' });
      new TestResource(stack, 'test-resource-b', { name: 'bar' });
    });

    const expectedProps = {
      name: 'baz',
      foo: expect.arrayContaining([expect.anything()]),
    };

    expect(() => expect(synthed).toHaveResourceWithProperties(TestResource, expectedProps))
      .toThrowErrorMatchingInlineSnapshot(`
        "Expected test_resource with properties {\\"name\\":\\"baz\\",\\"foo\\":\\"expect.ArrayContaining\\"} to be present in synthesized stack.
        Found 2 test_resource resources instead:
        [
          {
            \\"name\\": \\"foo\\"
          },
          {
            \\"name\\": \\"bar\\"
          }
        ]"
      `);
  });
});

class TestResource extends TerraformResource {
  public static readonly tfResourceType: string = 'test_resource';
  public name: string;

  constructor(
    scope: Construct,
    id: string,
    config: TerraformMetaArguments & {
      name: string;
    }
  ) {
    super(scope, id, {
      terraformResourceType: 'test_resource',
    });

    this.name = config.name;
  }

  override synthesizeAttributes(): { [name: string]: any } {
    return { name: this.name };
  }
}
