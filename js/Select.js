import {slideToggle, slideUp} from './slideToggle';

export class Select {
  constructor() {
    this.constants = {
      // CS -- Custom Select
      CS_CLASS: 'custom-select',
      CS_HEAD: 'custom-select__head',
      CS_BODY: 'custom-select__body',
      CS_ITEM: 'custom-select__item',
      CS_ITEM_CURRENT: 'custom-select__item--current',
      CS_ACTIVE_CLASS: 'custom-select--active',
    }
    this.init()
  }

  init() {
    this.createSelect()
    this.addSelectListeners()
  }

  createSelect() {
    this.customSelects = document.querySelectorAll(`.${this.constants.CS_CLASS}`)
    this.customSelects.forEach(customSelect => {
      const selectElem = customSelect.getElementsByTagName('select')[0]
      const head = this.createHead(selectElem)
      const body = this.createBody(selectElem)
      customSelect.appendChild(head)
      customSelect.appendChild(body)
    })
  }

  addSelectListeners() {
    document.addEventListener('click', e => {
      const selectHead = e.target.closest(`.${this.constants.CS_HEAD}`)
      const selectedItem = e.target.closest(`.${this.constants.CS_ITEM}`)
      if (selectHead) this.onHeadClickHandler(e, selectHead)
      else if (selectedItem) this.onOptionClickHandler(e, selectedItem)
      else this.closeAllSelect()
    })
  }

  createHead(selectElem) {
    const head = document.createElement('div')
    head.setAttribute('class', this.constants.CS_HEAD)
    head.innerHTML = selectElem.options[selectElem.selectedIndex].innerHTML
    return head
  }

  createBody(selectElem) {
    const body = document.createElement('div')
    body.setAttribute('class', this.constants.CS_BODY)
    for (let i = 1; i < selectElem.options.length; i++) {
      const option = document.createElement('div')
      option.setAttribute('class', this.constants.CS_ITEM)
      option.innerHTML = selectElem.options[i].innerHTML
      body.appendChild(option)
    }
    return body
  }

  onOptionClickHandler(e, selectedItem) {
    const selectElem = selectedItem.parentNode.parentNode.getElementsByTagName('select')[0];
    const selectHead = selectedItem.parentNode.previousSibling;
    for (let i = 0; i < selectElem.length; i++) {
      if (selectElem.options[i].innerHTML === selectedItem.innerHTML) {
        selectElem.selectedIndex = i;
        selectHead.innerHTML = selectedItem.innerHTML;
        const prevSelected =
            selectedItem.parentNode.querySelectorAll(`.${this.constants.CS_ITEM_CURRENT}`);
        prevSelected.forEach(prevSelectedItem => {
          if (prevSelectedItem) prevSelectedItem.classList.remove(this.constants.CS_ITEM_CURRENT);
        })
        selectedItem.classList.add(this.constants.CS_ITEM_CURRENT);
        break;
      }
    }
    selectHead.click();
  }

  onHeadClickHandler(e, selectHead) {
    e.stopPropagation();
    this.closeAllSelect(selectHead);
    selectHead.parentNode.classList.toggle(this.constants.CS_ACTIVE_CLASS);
    slideToggle(selectHead.nextSibling)
  }

  closeAllSelect(element) {
    // close all element except 'element'
    const selectHeads = document.getElementsByClassName(this.constants.CS_HEAD);
    for (let i = 0; i < selectHeads.length; i++) {
      const selectHead = selectHeads[i]
      if (element !== selectHead) {
        selectHead.parentNode.classList.remove(this.constants.CS_ACTIVE_CLASS);
        slideUp(selectHead.nextSibling)
      }
    }
  }
}
