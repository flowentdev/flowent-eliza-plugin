import "reflect-metadata";
import { z } from "zod";
import type { ContentPropertyDescription } from "../types";

const CONTENT_METADATA_KEY = "content:properties";

export type ContentClass<T> = {
    new (...args: unknown[]): T;
    prototype: T;
};

interface ContentPropertyConfig extends ContentPropertyDescription {
    schema: z.ZodType;
}

export function property(config: ContentPropertyConfig) {
    return (target: object, propertyKey: string) => {
        const properties =
            Reflect.getMetadata(CONTENT_METADATA_KEY, target) || {};
        properties[propertyKey] = config;
        Reflect.defineMetadata(CONTENT_METADATA_KEY, properties, target);
    };
}

/**
 * Create a Zod schema from a class decorated with @property
 *
 * @param cls
 * @returns
 */
export function createZodSchema<T>(cls: ContentClass<T>): z.ZodType<T> {
    const properties: Record<string, ContentPropertyConfig> =
        Reflect.getMetadata(CONTENT_METADATA_KEY, cls.prototype) || {};
    const schemaProperties = Object.entries(properties).reduce(
        (acc, [key, { schema }]) => {
            acc[key] = schema;
            return acc;
        },
        {} as Record<string, z.ZodType<T>>
    );
    return z.object(schemaProperties) as unknown as z.ZodType<T>;
}

/**
 * Load the description of each property from a class decorated with @property
 *
 * @param cls
 * @returns
 */
export function loadPropertyDescriptions<T>(
    cls: ContentClass<T>
): Record<string, ContentPropertyDescription> {
    const properties: Record<string, ContentPropertyConfig> =
        Reflect.getMetadata(CONTENT_METADATA_KEY, cls.prototype) || {};
    return Object.entries(properties).reduce(
        (acc, [key, { description, examples }]) => {
            acc[key] = { description, examples };
            return acc;
        },
        {} as Record<string, ContentPropertyDescription>
    );
}
