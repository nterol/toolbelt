import getUuid from 'uuid-by-string';

const raw = [
  {
    name: 'App.css',
    path: '/Users/nicolas/Projects/work/cli/packages/examples/src/App.css',
    imports: [],
  },
  {
    name: 'App.js',
    path: '/Users/nicolas/Projects/work/cli/packages/examples/src/App.js',
    imports: [
      {
        defaultImport: null,
        namedImports: [
          { name: 'BrowserRouter', value: 'Router' },
          { name: 'Route', value: 'Route' },
          { name: 'Switch', value: 'Switch' },
        ],
        starImport: null,
        fromModule: 'react-router-dom',
        isPackage: true,
      },
      {
        defaultImport: null,
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/App.css',
        isPackage: false,
      },
      {
        defaultImport: 'Main',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/pages/main',
        isPackage: false,
      },
      {
        defaultImport: 'Color',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/pages/color',
        isPackage: false,
      },
    ],
  },
  {
    name: 'assets.main.css',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/assets.main.css',
    imports: [],
  },
  {
    name: 'index.css',
    path: '/Users/nicolas/Projects/work/cli/packages/examples/src/index.css',
    imports: [],
  },
  {
    name: 'index.js',
    path: '/Users/nicolas/Projects/work/cli/packages/examples/src/index.js',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
      {
        defaultImport: 'ReactDOM',
        namedImports: [],
        starImport: null,
        fromModule: 'react-dom',
        isPackage: true,
      },
      {
        defaultImport: null,
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/index.css',
        isPackage: false,
      },
      {
        defaultImport: null,
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/assets/main.css',
        isPackage: false,
      },
      {
        defaultImport: 'App',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/App',
        isPackage: false,
      },
      {
        defaultImport: 'reportWebVitals',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/reportWebVitals',
        isPackage: false,
      },
    ],
  },
  {
    name: 'reportWebVitals.js',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/reportWebVitals.js',
    imports: [],
  },
  {
    name: 'setupTests.js',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/setupTests.js',
    imports: [
      {
        defaultImport: null,
        namedImports: [],
        starImport: null,
        fromModule: '@testing-library/jest-dom',
        isPackage: true,
      },
    ],
  },
  {
    name: 'main.css',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/assets/main.css',
    imports: [],
  },
  {
    name: 'tailwind.css',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/assets/tailwind.css',
    imports: [],
  },
  {
    name: 'badge.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/badge.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
    ],
  },
  {
    name: 'check-icon.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/check-icon.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
      {
        defaultImport: null,
        namedImports: [{ name: 'FontAwesomeIcon', value: 'FontAwesomeIcon' }],
        starImport: null,
        fromModule: '@fortawesome/react-fontawesome',
        isPackage: true,
      },
      {
        defaultImport: null,
        namedImports: [{ name: 'faCheck', value: 'faCheck' }],
        starImport: null,
        fromModule: '@fortawesome/free-solid-svg-icons',
        isPackage: true,
      },
    ],
  },
  {
    name: 'hero.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/hero.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
    ],
  },
  {
    name: 'price-header.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/price-header.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
    ],
  },
  {
    name: 'quote.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/quote.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
      {
        defaultImport: 'intersperse',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/utils/interspese',
        isPackage: false,
      },
    ],
  },
  {
    name: 'test-template.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/test-template.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
    ],
  },
  {
    name: 'card-layout.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/molecules/card-layout.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
    ],
  },
  {
    name: 'list-item.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/molecules/list-item.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
      {
        defaultImport: 'CheckIcon',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/check-icon',
        isPackage: false,
      },
    ],
  },
  {
    name: 'list.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/molecules/list.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
    ],
  },
  {
    name: 'price-card.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/components/organisms/price-card.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
      {
        defaultImport: 'PriceHeader',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/price-header',
        isPackage: false,
      },
      {
        defaultImport: 'CardLayout',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/molecules/card-layout',
        isPackage: false,
      },
      {
        defaultImport: 'List',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/molecules/list',
        isPackage: false,
      },
      {
        defaultImport: 'ListItem',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/molecules/list-item',
        isPackage: false,
      },
    ],
  },
  {
    name: 'color.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/pages/color.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
      {
        defaultImport: 'TestTemplate',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/test-template',
        isPackage: false,
      },
    ],
  },
  {
    name: 'main.jsx',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/pages/main.jsx',
    imports: [
      {
        defaultImport: 'React',
        namedImports: [],
        starImport: null,
        fromModule: 'react',
        isPackage: true,
      },
      {
        defaultImport: 'Badge',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/badge',
        isPackage: false,
      },
      {
        defaultImport: 'Hero',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/hero',
        isPackage: false,
      },
      {
        defaultImport: 'Quote',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/atoms/quote',
        isPackage: false,
      },
      {
        defaultImport: 'PriceCard',
        namedImports: [],
        starImport: null,
        fromModule:
          '/Users/nicolas/Projects/work/cli/packages/examples/src/components/organisms/price-card',
        isPackage: false,
      },
    ],
  },
  {
    name: 'interspese.js',
    path:
      '/Users/nicolas/Projects/work/cli/packages/examples/src/utils/interspese.js',
    imports: [],
  },
].map((e) => ({ ...e, id: getUuid(e.name) }));
const nodes = raw.map(({ name, path, id }) => { 
  const ext = name.split(".")
  return {
  name,
  path,
  id,
  group: ext[ext.length -1]
}});
const edges = raw.reduce((acc, current) => {
  const { id, name, imports } = current;

  const relations = imports
    .map(
      (
        { fromModule, isPackage, defaultImport, namedImports, starImport },
        i
      ) => {
        if (isPackage) {
           const is = nodes.findIndex((e) => e.path === fromModule);
            is === -1 && nodes.push({
              name: fromModule,
              path: fromModule,
              id: fromModule,
              group: "js",
              defaultImport,
              namedImports,
              starImport,
            });
          return {
            source: id,
            target: fromModule,
            id: `${name}-to-${fromModule}`,
          };
        }
        const [, hasExtension] = fromModule.split('.');
        const needle = hasExtension ? fromModule : `${fromModule}.js`;
        const reg = new RegExp(String.raw`${needle}`);
        const test = nodes.filter((tt) => tt.path.match(reg));
        const [target] = test;
        const nodeIndex = nodes.findIndex(
          (node) => node.path.localeCompare(target.path) === 0
        );

        nodes[nodeIndex].defaultImport = defaultImport;
        nodes[nodeIndex].namedImports = namedImports;
        nodes[nodeIndex].starImport = starImport;

        return {
          source: id,
          target: target.id,
          id: `${name}-to-${target.name}`,
        };
      }
    )
    .filter((e) => e);
  acc = [...acc, ...relations];
  return acc;
}, []);

const r = { nodes, edges };

r;
