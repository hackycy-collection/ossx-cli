import { parentPort } from 'node:worker_threads'

// Minimal worker example
parentPort?.postMessage({ ok: true })
