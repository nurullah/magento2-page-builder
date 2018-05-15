/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

import _ from "underscore";
import {ConverterInterface} from "../../../../converter/converter-interface";

export default class Markers implements ConverterInterface {
    /**
     * Convert value to internal format
     *
     * @param value string
     * @returns {string | object}
     */
    public fromDom(value: string): string | object {
        return value;
    }

    /**
     * Convert value to knockout format
     *
     * @param name string
     * @param data Object
     * @returns {string | object}
     */
    public toDom(name: string, data: object): string | object {
        let content = data[name];
        if (typeof content === "string" && content !== "") {
            content = JSON.parse(content);
        }
        if (content && _.every(["lat", "lng"], (key: string) => _.has(content, key))) {
            const result = {
                lat: content.lat,
                lng: content.lng,
            };
            return JSON.stringify([result]);
        }
        return JSON.stringify([]);
    }
}