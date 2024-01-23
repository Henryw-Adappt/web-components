import './style/style.css';
import * as Elements from './elements';
import main from './main.html?raw';

const templates = Object.values(Elements)
  .filter(
    element => 'template' in element && typeof element.template === 'string'
  )
  .map(element => (element as unknown as { template: string }).template)
  .reduce((agg, template) => agg + '\n' + template, '<!-- Templates -->');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
${main}
${templates}
`;
