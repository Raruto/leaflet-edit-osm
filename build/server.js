const esbuild = require('esbuild');

async function startServer(port = 0) {
  const build = await esbuild.context({ write: false });
  try {
    const server = await build.serve({ servedir: '.', host: '127.0.0.1', port });
    return { port: server.port, close: () => build.dispose() };
  } catch (error) {
    await build.dispose();
    throw error;
  }
}

module.exports = { startServer };
