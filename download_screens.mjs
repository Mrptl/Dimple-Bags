import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project configuration from Stitch
const PROJECT = {
  id: '5991784934149444547',
  title: 'Dimple Bags Website Redesign',
  screens: [
    {
      id: '55f6951c56314c4ba737082545cf8bb9',
      name: 'editorial_heavy_industry_variant',
      title: 'Dimple Bags - Editorial Heavy-Industry & Corporate Prestige Variant'
    },
    {
      id: 'bb0f69d3fb2f4a90915a5670cbffd2e1',
      name: 'swiss_high_precision_variant',
      title: 'Dimple Bags - Swiss High-Precision Variant'
    },
    {
      id: '9acc444398784f04b6e15eeeea7db7de',
      name: 'architectural_minimal_variant',
      title: 'Dimple Bags - Industrial Packaging (Architectural Minimal Variant)'
    },
    {
      id: '399ba418f67a4f88bb7c75240f29a70a',
      name: 'logo_hd2',
      title: 'Dimple Bags Official Logo',
      directUrl: 'https://dimplebags.in/wp-content/uploads/2025/12/logo-hd2.png',
      ext: '.png'
    }
  ]
};

async function downloadFile(url, destPath) {
  console.log(`Downloading: ${url} -> ${destPath}`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
  console.log(`Saved ${destPath} (${Buffer.from(arrayBuffer).length} bytes)`);
}

async function main() {
  const assetsDir = path.join(__dirname, 'assets');
  const screensDir = path.join(__dirname, 'screens');

  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(screensDir, { recursive: true });

  console.log(`=== Dimple Bags Stitch Asset Downloader ===`);
  console.log(`Project: ${PROJECT.title} (${PROJECT.id})\n`);

  for (const screen of PROJECT.screens) {
    if (screen.directUrl) {
      const dest = path.join(assetsDir, `${screen.name}${screen.ext || '.png'}`);
      try {
        await downloadFile(screen.directUrl, dest);
      } catch (err) {
        console.error(`Error downloading ${screen.name}:`, err.message);
      }
    } else {
      console.log(`[Screen] ${screen.title} (ID: ${screen.id})`);
      console.log(`  Note: This screen is hosted inside Google Stitch.`);
      console.log(`  To fetch via Stitch CLI, run: npx -y @_davideast/stitch-mcp screens -p ${PROJECT.id}`);
      console.log(`  Or export HTML/CSS directly from the Stitch canvas: https://stitch.withgoogle.com/projects/${PROJECT.id}\n`);
    }
  }
}

main().catch(console.error);
