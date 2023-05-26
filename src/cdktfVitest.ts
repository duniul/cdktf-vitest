import { testingMatchers as tm } from 'cdktf';
import { expect } from 'vitest';

/** A Terraform constructor like object, with a static resource type. */
export interface TerraformConstructorLike {
  readonly tfResourceType: string;
}

/**
 * CDKTF matchers for Vitest. Should be equivalent to the [official matchers for Jest](https://github.com/hashicorp/terraform-cdk/blob/main/packages/cdktf/lib/testing/adapters/jest.ts).
 */
export interface CdktfVitestMatchers<R = unknown> {
  /**
   * Checks if a certain resource exists. https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#tohaveresource
   * @param resourceConstructor the resource to check for
   */
  toHaveResource(resourceConstructor: TerraformConstructorLike): R;

  /**
   * Checks if a certain resource exists with all properties passed. https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#tohaveresourcewithproperties
   * @param resourceConstructor the resource to check for
   * @param properties the properties the resource should have
   */
  toHaveResourceWithProperties(
    resourceConstructor: TerraformConstructorLike,
    properties: Record<string, any>
  ): R;

  /**
   * Checks if a certain data source exists. https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#tohavedatasource
   * @param dataSourceConstructor the data source to check for
   */
  toHaveDataSource(dataSourceConstructor: TerraformConstructorLike): R;

  /**
   * Checks if a certain data source exists with all properties passed. https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#tohavedatasourcewithproperties
   * @param dataSourceConstructor the data source to check for
   * @param properties the properties the data source should have
   */

  toHaveDataSourceWithProperties(
    dataSourceConstructor: TerraformConstructorLike,
    properties: Record<string, any>
  ): R;

  /**
   * Checks if a certain provider exists. https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#tohaveprovider
   * @param providerConstructor the provider to check for
   */
  toHaveProvider(providerConstructor: TerraformConstructorLike): R;

  /**
   * Checks if a certain provider exists with all properties passed. https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#tohaveproviderwithproperties
   * @param providerConstructor the provider to check for
   * @param properties the properties the provider should have
   */
  toHaveProviderWithProperties(
    providerConstructor: TerraformConstructorLike,
    properties: Record<string, any>
  ): R;

  /**
   * Asserts that `terraform validate` runs successfully on the configuration. https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#integration-with-terraform
   */
  toBeValidTerraform(): R;

  /**
   * Asserts that `terraform plan` runs successfully on the configuration. https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#integration-with-terraform
   */
  toPlanSuccessfully(): R;
}

/** Vitest matcher result. See https://vitest.dev/guide/extending-matchers.html */
interface VitestMatcherResult {
  message: () => string;
  pass: boolean;
  actual?: unknown;
  expected?: unknown;
}

/**
 * Map a CDKTF matcher result to a [Vitest matcher result](https://vitest.dev/guide/extending-matchers.html).
 * @param matcherResult
 * @returns a Vitest expect result
 */
function toVitestResult(matcherResult: tm.AssertionReturn): VitestMatcherResult {
  return { message: () => matcherResult.message, pass: matcherResult.pass };
}

/**
 * Custom evaluation function to support vitest's asymmetric matchers and have feature parity
 * with CDKTF's Jest matchers.
 * @param items the items to evaluate, e.g. CDKTF stack entries
 * @param assertedProperties the properties we expect the items to have
 * @returns a vitest asymmetric match result
 */
function vitestPassEvaluation(items: any[], assertedProperties: Record<string, any>): boolean {
  if (Object.entries(assertedProperties).length === 0) {
    return items.length > 0;
  }

  return expect
    .arrayContaining([expect.objectContaining(assertedProperties)])
    .asymmetricMatch(items);
}

/**
 * Extends Vitest's `expect` with CDKTF's [expect matchers](https://developer.hashicorp.com/terraform/cdktf/test/unit-tests#write-assertions).
 */
export function setupCdktfVitest() {
  const toHaveResourceWithProperties = tm.getToHaveResourceWithProperties(vitestPassEvaluation);
  const toHaveDataSourceWithProperties = tm.getToHaveDataSourceWithProperties(vitestPassEvaluation);
  const toHaveProviderWithProperties = tm.getToHaveProviderWithProperties(vitestPassEvaluation);

  expect.extend({
    toHaveResource(received: string, resourceConstructor: TerraformConstructorLike) {
      const result = toHaveResourceWithProperties(received, resourceConstructor, {});
      return toVitestResult(result);
    },

    toHaveResourceWithProperties(
      received: string,
      resourceConstructor: TerraformConstructorLike,
      properties: Record<string, any>
    ) {
      const result = toHaveResourceWithProperties(received, resourceConstructor, properties);
      return toVitestResult(result);
    },

    toHaveDataSource(received: string, dataSourceConstructor: TerraformConstructorLike) {
      const result = toHaveDataSourceWithProperties(received, dataSourceConstructor, {});
      return toVitestResult(result);
    },

    toHaveDataSourceWithProperties(
      received: string,
      dataSourceConstructor: TerraformConstructorLike,
      properties: Record<string, any>
    ) {
      const result = toHaveDataSourceWithProperties(received, dataSourceConstructor, properties);
      return toVitestResult(result);
    },

    toHaveProvider(received: string, providerConstructor: TerraformConstructorLike) {
      const result = toHaveProviderWithProperties(received, providerConstructor, {});
      return toVitestResult(result);
    },

    toHaveProviderWithProperties(
      received: string,
      providerConstructor: TerraformConstructorLike,
      properties: Record<string, any>
    ) {
      const result = toHaveProviderWithProperties(received, providerConstructor, properties);
      return toVitestResult(result);
    },

    toBeValidTerraform(received: string) {
      const result = tm.toBeValidTerraform(received);
      return toVitestResult(result);
    },

    toPlanSuccessfully(received: string) {
      const result = tm.toPlanSuccessfully(received);
      return toVitestResult(result);
    },
  });
}
