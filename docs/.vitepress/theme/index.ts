import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Import custom components
import OrnamentalDivider from './components/OrnamentalDivider.vue'
import DecoratedSection from './components/DecoratedSection.vue'
import FramedBox from './components/FramedBox.vue'
import TeacherAvatar from './components/TeacherAvatar.vue'
import AyahDisplay from './components/AyahDisplay.vue'
import SectionIndex from './components/SectionIndex.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register global components
    app.component('OrnamentalDivider', OrnamentalDivider)
    app.component('DecoratedSection', DecoratedSection)
    app.component('FramedBox', FramedBox)
    app.component('TeacherAvatar', TeacherAvatar)
    app.component('AyahDisplay', AyahDisplay)
    app.component('SectionIndex', SectionIndex)
  }
}
