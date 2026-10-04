// Vercel entry point for MOOSHA. The logic lives in server/moosha-core.mjs.
import { handler } from '../server/moosha-core.mjs';

export const GET = handler;
export const POST = handler;
