import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en-us.json'

Vue.use(VueI18n)

const messages = {
    'en-us': {
        ...en
    }
}

export default new VueI18n({
    locale: 'en-us',
    messages,
})