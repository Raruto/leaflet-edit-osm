const esbuild = require('esbuild');
const { createServer } = require('node:http');
const { name } = require('../package.json');

const packagePath = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const cdnPrefix = new RegExp(`https://unpkg\\.com/${packagePath}(?:@[^/\\s"'<>]+)?/`, 'g');

async function startServer(port = 0) {
  const build = await esbuild.context({
    entryPoints: ['leaflet-edit-osm.js'],
    outfile: 'leaflet-edit-osm.min.js', minify: true,
  });
  let server;
  try {
    await build.watch();
    const assets = await build.serve({ servedir: '.', host: '127.0.0.1', port: 0 });
    server = createServer(async (request, response) => {
      try {
        const upstream = await fetch(`http://127.0.0.1:${assets.port}${request.url}`, {
          method: request.method === 'HEAD' ? 'GET' : request.method,
          headers: { 'Accept-Encoding': 'identity' },
        });
        const headers = Object.fromEntries(upstream.headers);
        let body = Buffer.from(await upstream.arrayBuffer());
        if ((headers['content-type'] || '').startsWith('text/html')) {
          body = Buffer.from(body.toString().replace(cdnPrefix, '/')
            .replace(/(["'])\/leaflet-edit-osm\.js(?=[?"'])/g, '$1/leaflet-edit-osm.min.js'));
        }
        delete headers['transfer-encoding'];
        headers['content-length'] = body.length;
        headers['cache-control'] = 'no-store';
        response.writeHead(upstream.status, headers);
        response.end(request.method === 'HEAD' ? undefined : body);
      } catch (error) {
        console.error(error);
        response.writeHead(500).end('Development server error');
      }
    });
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(port, '127.0.0.1', () => { server.off('error', reject); resolve(); });
    });
    return {
      port: server.address().port,
      close: () => Promise.all([
        new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())),
        build.dispose(),
      ]),
    };
  } catch (error) {
    if (server && server.listening) await new Promise(resolve => server.close(resolve));
    await build.dispose();
    throw error;
  }
}

module.exports = { startServer };
if (require.main === module) {
  startServer(8080).then(server => {
    console.log(`Serving on http://127.0.0.1:${server.port}`);
    for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await server.close(); });
  }).catch(error => { console.error(error); process.exitCode = 1; });
}
