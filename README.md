# Custom select

To run demo:
```
yarn global add parcel-bundler

yarn install

parcel index.html
```

## Init Custom Select
Wrap `select` with `.custom-select`
```html
<!-- html -->
<div class="custom-select">
    <select required name="hero">
        <option value="">Select hero:</option>
        <option value="riki">riki</option>
        <option value="lina">lina</option>
    </select>
</div>
```
Init `Select` at JS
```javascript
// js file
import {Select} from './Select';

new Select()
```

## File Structure 
`./js/Select.js` -- code of Custom Select

`./js/slideToggle.js` -- code of helper function. `slideToggle` acts as like the same function at jQuery. 

`./styles/select.scss` -- styles for select.
