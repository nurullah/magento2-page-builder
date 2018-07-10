/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import _ from "underscore";
import ConverterInterface, {ConverterConfigInterface, ConverterDataInterface} from "./converter-interface";

export default class WidgetDirectiveAbstract implements ConverterInterface {
    /**
     * Convert value to internal format
     *
     * @param {ConverterDataInterface} data
     * @param {ConverterConfigInterface} config
     * @returns {object}
     */
    public fromDom(data: ConverterDataInterface, config: ConverterConfigInterface): object {
        let attributes: object = {};

        data[config.html_variable].replace(/\{\{widget(.*?)\}\}/i, ((match: string, attributeString: string) => {
            attributes = this.parseAttributesString(attributeString);
        }).bind(this));

        return attributes;
    }

    /**
     * Convert value to knockout format
     *
     * @param {ConverterDataInterface} data
     * @param {ConverterConfigInterface} config
     * @returns {object}
     */
    public toDom(data: ConverterDataInterface, config: ConverterConfigInterface): object {
        data[config.html_variable] = this.buildDirective(data);
        return data;
    }

    /**
     * Build the directive string using the supplies attributes
     *
     * @param {object} attributes
     * @returns {string}
     */
    protected buildDirective(attributes: object): string {
        return "{{widget " + this.createAttributesString(attributes) + "}}";
    }

    /**
     * @param {string} attributes
     * @return {Object}
     */
    protected parseAttributesString(attributes: string): object {
        const result: {
            [key: string]: string;
        } = {};

        attributes.replace(
            /(\w+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
            (match: string, key: string, value: string) => {
                result[key] = value.replace(/&quote;/g, "\"");
            },
        );

        return result;
    }

    /**
     * @param {Object} attributes
     * @return {string}
     */
    protected createAttributesString(attributes: object): string {
        let result = "";

        _.each(attributes, (value, name) => {
            result += name + "=\"" + String(value).replace(/"/g, "&quote;") + "\" ";
        });

        return result.substr(0, result.length - 1);
    }
}
