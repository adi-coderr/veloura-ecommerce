/**
 * Ensures generated studio product and editorial images exist in frontend/images/.
 * Automatically copies local workspace artifacts on first startup if missing.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const config = require('../config');

const ARTIFACT_SOURCE_DIR = path.join(
  os.homedir(),
  '.gemini',
  'antigravity',
  'brain',
  'df165c36-facd-415a-85ab-ee81557da11d'
);

const IMAGE_ASSET_MAP = [
  ['hero-editorial.jpg', 'hero_editorial_1795718436530.jpg'],
  ['serum-dropper.jpg', 'serum_dropper_1795718441219.jpg'],
  ['cream-jar.jpg', 'cream_jar_1795718440675.jpg'],
  ['mist-bottle.jpg', 'mist_bottle_1795718444096.jpg'],
  ['oil-flacon.jpg', 'oil_flacon_1795718443056.jpg'],
  ['gift-ritual-set.jpg', 'gift_ritual_set_v2_1795718470167.jpg'],
  ['hair-collection.jpg', 'hair_collection_v2_1795718468113.jpg'],
  ['hair-duo-studio.jpg', 'hair_collection_1795718453608.jpg'],
  ['gift-ceremony-edit.jpg', 'gift_ritual_set_1795718450458.jpg'],
  ['editorial-texture.jpg', 'editorial_texture_1795718454517.jpg'],
  ['atelier-about.jpg', 'atelier_about_v2_1795718474065.jpg'],
  ['ritual-vanity.jpg', 'ritual_vanity_1795718459704.jpg'],
  ['eye-elixir.jpg', 'veloura_peony_eye_elixir_1795769040537.jpg'],
  ['hand-balm.jpg', 'veloura_neroli_hand_balm_v2_1795769109904.jpg'],
  ['hair-mist.jpg', 'veloura_camellia_hair_mist_1795769041003.jpg'],
  ['nocturne-set.jpg', 'veloura_luxury_gift_set_final_1795769125511.jpg'],
  ['cleansing-oil.jpg', 'veloura_cleansing_oil_packshot_1795769044276.jpg'],
  ['clay-mask.jpg', 'veloura_earth_glow_mask_1795769232290.jpg'],
  ['soft-wash.jpg', 'veloura_soft_wash_bottle_1795769048346.jpg'],
  ['body-butter.jpg', 'veloura_cloud_silk_butter_1795769233258.jpg']
];

/** Copy any missing image files from the local generation artifact folder into frontend/images/. */
function ensureFrontendImages() {
  const targetDir = path.join(config.paths.frontend, 'images');
  let copiedCount = 0;

  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    for (const [targetName, sourceName] of IMAGE_ASSET_MAP) {
      const destPath = path.join(targetDir, targetName);
      if (fs.existsSync(destPath)) continue;

      const srcPath = path.join(ARTIFACT_SOURCE_DIR, sourceName);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        copiedCount++;
      }
    }

    if (copiedCount > 0) {
      console.log(`  ✓ Prepared ${copiedCount} studio beauty images in frontend/images/`);
    }
  } catch (err) {
    console.warn('  ⚠ Skipping image sync:', err.message);
  }
}

module.exports = ensureFrontendImages;
