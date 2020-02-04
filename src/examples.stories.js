import Example from './examples.pug';
import { renderer } from 'storypug';

const { html } = renderer()

export default {
    title: 'Example',
};

export const Basic = () => {
    const props = { intro: 'This is an intro' };
    // this HTML will be rendered inside the mixin's block
    const contents = '<p>Example body</p>';
 
  return html(Example, props, contents)
};