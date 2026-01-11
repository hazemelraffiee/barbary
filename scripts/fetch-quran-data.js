#!/usr/bin/env node

/**
 * Fetches Quran verses from alquran.cloud API and saves them locally
 * Run with: node scripts/fetch-quran-data.js
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'https://api.alquran.cloud/v1';

// Surahs used in the ruqyah page
const SURAHS_TO_FETCH = [2, 3, 7, 9, 11, 12, 13, 23, 24, 25, 39, 41, 65, 66, 93, 94, 114];

async function fetchSurah(surahNumber) {
  const response = await fetch(`${API_BASE}/surah/${surahNumber}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch surah ${surahNumber}`);
  }
  const json = await response.json();
  return json.data;
}

async function main() {
  console.log('Fetching Quran data...');

  const quranData = {};

  for (const surahNum of SURAHS_TO_FETCH) {
    console.log(`Fetching Surah ${surahNum}...`);
    try {
      const surah = await fetchSurah(surahNum);
      quranData[surahNum] = {
        name: surah.name,
        englishName: surah.englishName,
        ayahs: surah.ayahs.map(a => ({
          number: a.numberInSurah,
          text: a.text
        }))
      };
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 200));
    } catch (error) {
      console.error(`Error fetching surah ${surahNum}:`, error.message);
    }
  }

  const outputPath = path.join(__dirname, '../docs/public/quran-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(quranData, null, 2), 'utf-8');

  console.log(`\nQuran data saved to ${outputPath}`);
  console.log(`Total surahs: ${Object.keys(quranData).length}`);
}

main().catch(console.error);
