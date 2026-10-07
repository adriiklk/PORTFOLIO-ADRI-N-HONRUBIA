import test from 'node:test';
import assert from 'node:assert/strict';
import { projectPaths, resolvePath, pathForView } from '../src/projectRoutes.mjs';

test('all seven project URLs resolve to their original component IDs', () => {
  assert.equal(Object.keys(projectPaths).length, 7);
  assert.equal(new Set(Object.values(projectPaths)).size, 7);
  for (const [id, path] of Object.entries(projectPaths)) {
    assert.deepEqual(resolvePath(path), { view: 'project', selectedProjectId: id });
    assert.deepEqual(resolvePath(path + '/'), resolvePath(path));
    assert.equal(pathForView(resolvePath(path)), path);
  }
});
test('home and unknown paths are handled explicitly', () => {
  assert.deepEqual(resolvePath('/'), { view: 'home' });
  assert.equal(pathForView({ view: 'home' }), '/');
  assert.deepEqual(resolvePath('/missing-project'), { view: 'not-found' });
  assert.deepEqual(resolvePath('/imaclinic/missing'), { view: 'not-found' });
  assert.throws(() => pathForView({view: 'project', selectedProjectId: 'missing'}));
});
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';


function navigationHarness(path = '/') {
  const slots = []; let cursor = 0; const effects = []; const frames = [];
  const listeners = new Map(); const positions = []; let sectionReady = false;
  const location = new URL(path, 'https://portfolio.test');
  const stack = [location.href]; let stackIndex = 0;
  const history = {
    scrollRestoration: 'auto',
    pushState(_state, _unused, path) {
      location.href = new URL(path, location).href;
      stack.splice(++stackIndex); stack.push(location.href);
    },
  };
  const window = { location, history, scrollY: 0,
    scrollTo({top}) { this.scrollY = top; positions.push(top); },
    addEventListener(type, callback) { listeners.set(type, callback); },
    removeEventListener(type) { listeners.delete(type); },
  };
  const react = {
    useState(init) { const i = cursor++; if (!(i in slots)) slots[i] = typeof init === 'function' ? init() : init; return [slots[i], v => { slots[i] = v; }]; },
    useRef(value) { const i = cursor++; return slots[i] ??= { current: value }; },
    useCallback(callback) { cursor++; return callback; },
    useEffect(effect) { const i = cursor++; if (!(i in slots)) { slots[i] = true; effects.push(effect); } },
  };
  const module = { exports: {} };
  const source = ts.transpileModule(readFileSync(new URL('../src/usePortfolioNavigation.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(source, { module, exports: module.exports, require: name => name === 'react' ? react : {resolvePath, pathForView}, window, location, history,
    requestAnimationFrame: callback => frames.push(callback),
    document: { getElementById: id => sectionReady ? { scrollIntoView() { positions.push(id); } } : null },
  });
  const render = () => { cursor = 0; const result = module.exports.default(); while (effects.length) effects.shift()(); return result; };
  return { render, window, history, location, positions,
    sectionReady() { sectionReady = true; },
    scroll(y) { window.scrollY = y; listeners.get('scroll')?.(); },
    go(delta) { stackIndex += delta; location.href = stack[stackIndex]; listeners.get('popstate')(); while(frames.length) frames.shift()(); },
  };
}

test('navigation and browser history retain project identity and home scroll', () => {
  const h = navigationHarness(); let app = h.render();
  h.scroll(1250);
  app.navigate({ view: 'project', selectedProjectId: 'imaclinic' });
  assert.equal(h.location.pathname, '/imaclinic');
  app = h.render(); assert.equal(app.viewState.selectedProjectId, 'imaclinic');
  h.go(-1); app = h.render(); app.restoreHome();
  assert.equal(app.viewState.view, 'home'); assert.equal(h.window.scrollY, 1250);
  h.go(1); app = h.render(); assert.equal(app.viewState.selectedProjectId, 'imaclinic');
});

test('direct load and reload resolve the project, and section navigation waits for mount', () => {
  const h = navigationHarness('/napoli'); let app = h.render();
  assert.equal(app.viewState.selectedProjectId, 'aura-studios');
  assert.equal(navigationHarness('/napoli').render().viewState.selectedProjectId, 'aura-studios');
  app.navigate({ view: 'home' }, 'work'); app = h.render();
  app.restoreHome(); assert.deepEqual(h.positions, []);
  h.sectionReady(); app.restoreHome(); assert.deepEqual(h.positions, ['work']);
  assert.equal(h.location.hash, '#work');
  app.navigate({ view: 'home' }, 'top'); assert.equal(h.location.hash, '');
  assert.equal(h.positions.at(-1), 0);
});
