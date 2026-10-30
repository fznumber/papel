import { createOpenSCAD, type OpenSCADInstance } from "openscad-wasm-prebuilt";

let openscad: OpenSCADInstance | null = null;

async function initOpenSCAD() {
  if (!openscad) {
    console.log("[Worker] Initializing OpenSCAD WASM...");
    openscad = await createOpenSCAD({
      print: (text) => console.log("[OpenSCAD]", text),
      printErr: (text) => console.error("[OpenSCAD]", text),
    });
    console.log("[Worker] OpenSCAD WASM initialized");
  }
  return openscad;
}

self.onmessage = async (e: MessageEvent<{ id: string; code: string }>) => {
  const { id, code } = e.data;
  console.log(`[Worker] Received render request ${id}`);

  try {
    const instance = await initOpenSCAD();
    console.log(`[Worker] Rendering ${code.length} chars of OpenSCAD code...`);
    const stl = await instance.renderToStl(code);
    console.log(`[Worker] Render complete, STL size: ${stl.length} bytes`);
    self.postMessage({ id, stl, error: null });
  } catch (error) {
    console.error(`[Worker] Render error:`, error);
    self.postMessage({ id, stl: null, error: String(error) });
  }
};
