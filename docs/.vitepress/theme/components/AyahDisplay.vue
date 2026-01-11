<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  surah: {
    type: Number,
    required: true
  },
  ayah: {
    type: [Number, String],
    required: true
  }
})

const text = ref('')
const isLoading = ref(true)
const error = ref(false)

// Surah names in Arabic
const surahNames = {
  1: 'الفاتحة', 2: 'البقرة', 3: 'آل عمران', 4: 'النساء', 5: 'المائدة',
  6: 'الأنعام', 7: 'الأعراف', 8: 'الأنفال', 9: 'التوبة', 10: 'يونس',
  11: 'هود', 12: 'يوسف', 13: 'الرعد', 14: 'إبراهيم', 15: 'الحجر',
  16: 'النحل', 17: 'الإسراء', 18: 'الكهف', 19: 'مريم', 20: 'طه',
  21: 'الأنبياء', 22: 'الحج', 23: 'المؤمنون', 24: 'النور', 25: 'الفرقان',
  26: 'الشعراء', 27: 'النمل', 28: 'القصص', 29: 'العنكبوت', 30: 'الروم',
  31: 'لقمان', 32: 'السجدة', 33: 'الأحزاب', 34: 'سبأ', 35: 'فاطر',
  36: 'يس', 37: 'الصافات', 38: 'ص', 39: 'الزمر', 40: 'غافر',
  41: 'فصلت', 42: 'الشورى', 43: 'الزخرف', 44: 'الدخان', 45: 'الجاثية',
  46: 'الأحقاف', 47: 'محمد', 48: 'الفتح', 49: 'الحجرات', 50: 'ق',
  51: 'الذاريات', 52: 'الطور', 53: 'النجم', 54: 'القمر', 55: 'الرحمن',
  56: 'الواقعة', 57: 'الحديد', 58: 'المجادلة', 59: 'الحشر', 60: 'الممتحنة',
  61: 'الصف', 62: 'الجمعة', 63: 'المنافقون', 64: 'التغابن', 65: 'الطلاق',
  66: 'التحريم', 67: 'الملك', 68: 'القلم', 69: 'الحاقة', 70: 'المعارج',
  71: 'نوح', 72: 'الجن', 73: 'المزمل', 74: 'المدثر', 75: 'القيامة',
  76: 'الإنسان', 77: 'المرسلات', 78: 'النبأ', 79: 'النازعات', 80: 'عبس',
  81: 'التكوير', 82: 'الانفطار', 83: 'المطففين', 84: 'الانشقاق', 85: 'البروج',
  86: 'الطارق', 87: 'الأعلى', 88: 'الغاشية', 89: 'الفجر', 90: 'البلد',
  91: 'الشمس', 92: 'الليل', 93: 'الضحى', 94: 'الشرح', 95: 'التين',
  96: 'العلق', 97: 'القدر', 98: 'البينة', 99: 'الزلزلة', 100: 'العاديات',
  101: 'القارعة', 102: 'التكاثر', 103: 'العصر', 104: 'الهمزة', 105: 'الفيل',
  106: 'قريش', 107: 'الماعون', 108: 'الكوثر', 109: 'الكافرون', 110: 'النصر',
  111: 'المسد', 112: 'الإخلاص', 113: 'الفلق', 114: 'الناس'
}

const reference = computed(() => {
  const surahName = surahNames[props.surah] || `سورة ${props.surah}`
  return `${surahName} : ${props.ayah}`
})

async function fetchAyah(surahNumber, ayahNumber) {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surahNumber}:${ayahNumber}`
    )
    if (!response.ok) return null
    const json = await response.json()
    return json.data?.text || null
  } catch {
    return null
  }
}

async function fetchSurah(surahNumber) {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}`
    )
    if (!response.ok) return null
    const json = await response.json()
    return json.data?.ayahs || null
  } catch {
    return null
  }
}

// Convert number to Arabic numerals
function toArabicNumber(num) {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return String(num).split('').map(d => arabicNumerals[parseInt(d)]).join('')
}

// Remove Arabic diacritics for comparison
function removeDiacritics(text) {
  return text.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u08D4-\u08E1\u08E3-\u08FF\u0610-\u061A]/g, '')
}

// Remove Basmalah from beginning of verse (except for Al-Fatiha)
function removeBasmalah(text, surahNumber, ayahNumber) {
  if (surahNumber === 1) return text // Keep Basmalah for Al-Fatiha
  if (ayahNumber !== 1) return text // Only first ayah has Basmalah

  // Normalize text for comparison
  const normalized = removeDiacritics(text)

  // Check if starts with بسم (normalized)
  if (!normalized.startsWith('بسم')) return text

  // Find the position after الرحيم in normalized text
  const rahimPatterns = ['الرحیم ', 'الرحيم ', 'ٱلرحیم ', 'ٱلرحيم ']
  for (const pattern of rahimPatterns) {
    const idx = normalized.indexOf(pattern)
    if (idx !== -1) {
      // Find corresponding position in original text
      // Count characters up to and including the pattern
      const normalizedPrefix = normalized.slice(0, idx + pattern.length)

      // Find where this maps to in original text
      let origIdx = 0
      let normCount = 0
      while (origIdx < text.length && normCount < normalizedPrefix.length) {
        const char = text[origIdx]
        const normChar = removeDiacritics(char)
        if (normChar.length > 0) normCount++
        origIdx++
      }

      return text.slice(origIdx).trim()
    }
  }

  return text
}

async function fetchAyahRange(surahNumber, startAyah, endAyah) {
  // Fetch entire surah and extract the range (more efficient)
  const ayahs = await fetchSurah(surahNumber)
  if (!ayahs) return null

  const verses = ayahs
    .filter(a => a.numberInSurah >= startAyah && a.numberInSurah <= endAyah)
    .map(a => {
      const cleanText = removeBasmalah(a.text, surahNumber, a.numberInSurah)
      return `${cleanText} ﴿${toArabicNumber(a.numberInSurah)}﴾`
    })

  return verses.join(' ')
}

onMounted(async () => {
  try {
    const ayahStr = String(props.ayah)

    if (ayahStr.includes('-')) {
      // Range like "97-98"
      const [start, end] = ayahStr.split('-').map(Number)
      text.value = await fetchAyahRange(props.surah, start, end)
    } else {
      // Single ayah
      text.value = await fetchAyah(props.surah, Number(ayahStr))
    }

    if (!text.value) {
      error.value = true
    }
  } catch (e) {
    error.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="ayah-display">
    <div v-if="isLoading" class="ayah-loading">
      جاري التحميل...
    </div>
    <div v-else-if="error" class="ayah-error">
      تعذر تحميل الآية
    </div>
    <div v-else class="ayah-content">
      <p class="ayah-text">{{ text }}</p>
      <span class="ayah-reference">{{ reference }}</span>
    </div>
  </div>
</template>

<style scoped>
.ayah-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  margin: 1rem 0;
  background: linear-gradient(135deg, rgba(254, 243, 199, 0.3) 0%, rgba(254, 215, 170, 0.2) 100%);
  border-radius: 1rem;
  border: 1px solid rgba(217, 119, 6, 0.2);
}

.ayah-loading,
.ayah-error {
  color: #92400e;
  font-size: 1rem;
}

.ayah-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.ayah-text {
  font-family: 'Amiri Quran', 'Amiri', 'Noto Naskh Arabic', serif;
  font-size: 1.5rem;
  line-height: 2.2;
  text-align: center;
  color: #78350f;
  margin: 0;
  text-wrap: balance;
}

@media (min-width: 768px) {
  .ayah-text {
    font-size: 1.75rem;
  }
}

@media (min-width: 1024px) {
  .ayah-text {
    font-size: 2rem;
  }
}

.ayah-reference {
  font-size: 0.875rem;
  color: #92400e;
  opacity: 0.8;
}

.dark .ayah-display {
  background: linear-gradient(135deg, rgba(120, 53, 15, 0.2) 0%, rgba(146, 64, 14, 0.15) 100%);
  border-color: rgba(217, 119, 6, 0.3);
}

.dark .ayah-text {
  color: #fef3c7;
}

.dark .ayah-reference {
  color: #fcd34d;
}

.dark .ayah-loading,
.dark .ayah-error {
  color: #fcd34d;
}
</style>
