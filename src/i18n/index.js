import Vue from 'vue'
import VueI18n from 'vue-i18n'
import pl from './pl.json'

Vue.use(VueI18n);

const messages = {
    'pl': {
        ...pl
    }
};

export default new VueI18n({
    locale: 'pl',
    messages,
});