import '../style/index.scss'

import {Select} from './Select';

function afterLoadInitScripts() {
  const selects = new Select()
}

window.addEventListener('DOMContentLoaded', afterLoadInitScripts)
