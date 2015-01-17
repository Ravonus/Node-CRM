/**
 * Forms.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        formName: {
            type: 'string',
            required: true
        },

        owner: {
            type: 'string',
            required: true
        },

        data: {
            type: 'string',
            required: true
        },
    }
};