export const projectPaths = {
  imaclinic: '/imaclinic',
  'los-santos-detailing': '/los-santos',
  'el-bon-vermut': '/el-bon-vermut',
  'vague-magazine': '/lapara',
  'ikea-spot': '/ikea',
  'aura-studios': '/napoli',
  'nocturnal-drift': '/mana',
};

export function resolvePath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { view: 'home' };
  const entry = Object.entries(projectPaths).find(([, url]) => url === path);
  return entry ? { view: 'project', selectedProjectId: entry[0] } : { view: 'not-found' };
}

export function pathForView(state) {
  if (state.view === 'home') return '/';
  const path = projectPaths[state.selectedProjectId];
  if (!path) throw new Error('Unknown project');
  return path;
}
