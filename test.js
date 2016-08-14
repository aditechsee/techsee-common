'use strict';

require('./lib/config-loader').load({
    confFiles: {
        local: 'local.env'
    },
    templateFile: 'template.env',
    mandatoryKeys: ['A']
});
