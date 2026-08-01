import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the ecosystem dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Solana Signal/);
  assert.match(html, /The Solana ecosystem/);
  assert.match(html, /Network pulse/);
  assert.match(html, /Validator intelligence/);
  assert.match(html, /Economic surface/);
  assert.match(html, /Upgrade radar/);
  assert.match(html, /Built to be audited/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("embeds current provenance and machine-readable links", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /Solana RPC/);
  assert.match(html, /DefiLlama/);
  assert.match(html, /CoinGecko/);
  assert.match(html, /Solana Data/);
  assert.match(html, /\/data\/latest\.json/);
});
