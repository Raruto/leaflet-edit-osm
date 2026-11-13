const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');
const { After, AfterAll, BeforeAll, Then, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30000);
let browser;
BeforeAll(async () => { browser = await chromium.launch(); });
After(async function () { if (this.page) await this.page.close(); });
AfterAll(async () => { if (browser) await browser.close(); });

Then('the {string} bundle works with Leaflet {string}', async function (bundle, version) {
        const suffix = bundle === 'minified' ? '.min' : '';
        const page = this.page = await browser.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.setContent('<div id="map" style="height:400px"></div>');
        const dist = `https://unpkg.com/leaflet@${version}/dist`;
        await page.addStyleTag({ url: `${dist}/leaflet.css` });
        await page.addScriptTag({ url: `${dist}/${version === '1.9.4' ? 'leaflet.js' : 'leaflet-global.js'}` });
        await page.addScriptTag({ path: path.join(__dirname, '..', '..', `leaflet-edit-osm${suffix}.js`) });
        const result = await page.evaluate(() => {
          const map = new (L.LeafletMap || L.Map)('map', { center: [45, 9], zoom: 12 });
          let opened;
          window.open = url => { opened = url; };
          const control = new L.Control.EditInOSM({ editor: 'id' }).addTo(map);
          control.getContainer().querySelector('a').click();
          const actual = { version: L.version, position: control.getPosition(), opened, parentPosition: new L.Control().getPosition() };
          control.remove();
          control.addTo(map);
          map.remove();
          return actual;
        });
        assert.equal(result.version, version);
        assert.equal(result.position, 'bottomright');
        assert.equal(result.parentPosition, 'topright');
        const url = new URL(result.opened);
        assert.equal(url.searchParams.get('zoom'), '12');
        assert.equal(url.searchParams.get('editor'), 'id');
        assert.equal(url.searchParams.get('lat'), '45');
        assert.equal(url.searchParams.get('lon'), '9');
        assert.deepEqual(errors, []);
});
