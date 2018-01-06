const builder = require('xmlbuilder');

module.exports = {
    /**
     * Cast to XML.
     */
    toXml: (input) => {
        let xml = builder.create('films');
        JSON.parse(input).forEach((e) => {
            let item = xml.ele('film');
            item.att('id', e._id);
            item.ele('title', e.title);
            item.ele('year', e.year);
            item.ele('director', e.director);
            item.ele('cast', e.cast);
            item.ele('review', e.review);
        });
        xml.end({
            pretty: true
        });
        return xml.toString();
    },

    /**
     * Cast to tab spaces.
     */
    toTab: (input) => {
        let tab = '';
        JSON.parse(input).forEach((e) => {
            for(let key in e) {
                if(e.hasOwnProperty(key)) {
                    // Replace all tabs.
                    let value = String(e[key]).replace(/\t/g, '');
                    tab += `"${value}"\t`;
                }
            }
            // Slice to remove trailing comma.
            tab = `${tab.slice(0, -1)}\n`;
        });
        // Slice to remove trailing line break.
        return tab.slice(0, -1);
    },

    /**
     * Cast to comma-separated values.
     */
    toCsv: (input) => {
        let csv = '';
        JSON.parse(input).forEach((e) => {
            for(let key in e) {
                if(e.hasOwnProperty(key)) {
                    // Escape all double quotes.
                    let value = String(e[key]).replace(/"/g, '""');
                    csv += `"${value}",`;
                }
            }
            // Slice to remove trailing comma.
            csv = `${csv.slice(0, -1)}\n`;
        });
        // Slice to remove trailing line break.
        return csv.slice(0, -1);
    }
}