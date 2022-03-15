import {MetadataItem} from '../queues/metadataItem';

/**
 * models
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 2.12
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */



export interface ModelsEditRequest {
    /**
     * Model ID
     */
    model: string;
    /**
     * URI for the model
     */
    uri?: string;
    /**
     * Model name Unique within the company.
     */
    name?: string;
    /**
     * Model comment
     */
    comment?: string;
    /**
     * User-defined tags list
     */
    tags?: Array<string>;
    /**
     * System tags list. This field is reserved for system use, please don't use it.
     */
    system_tags?: Array<string>;
    /**
     * Framework on which the model is based. Case insensitive. Should be identical to   the framework of the task which created the model.
     */
    framework?: string;
    /**
     * Json[d] object representing the model design. Should be identical to the   network design of the task which created the model
     */
    design?: any;
    /**
     * Json object
     */
    labels?: { [key: string]: number; };
    /**
     * Indication if the model is final and can be used by other tasks
     */
    ready?: boolean;
    /**
     * Project to which to model belongs
     */
    project?: string;
    /**
     * Parent model
     */
    parent?: string;
    /**
     * Associated task ID
     */
    task?: string;
    /**
     * Iteration (used to update task statistics)
     */
    iteration?: number;
    metadata?: object;
}
