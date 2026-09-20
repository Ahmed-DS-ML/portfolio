import { rm } from 'node:fs/promises';
import { join } from 'node:path';

export async function onBuild() {
  const emailsFn = join(process.cwd(), '.netlify', 'functions-internal', 'emails');
  await rm(emailsFn, { recursive: true, force: true });
  console.log('Removed leftover Netlify Emails internal function (site is static ESM).');
}
