import Example from './examples.pug';
 
export default {
  title: 'Example',
};
 
export const Basic = () => {
  // setup properties
  const props = { intro: 'This is an intro' };
  // this HTML will be rendered inside the mixin's block
  const contents = '<p>Example body</p>';
 
  return Example({ props, contents });
};