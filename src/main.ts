import Application, { DOMBuilder, RuntimeCompilerLoader, SyncRenderer } from '@glimmer/application';
import Resolver, { BasicModuleRegistry } from '@glimmer/resolver';
import moduleMap from '../config/module-map';
import resolverConfiguration from '../config/resolver-configuration';
import Component, { tracked } from '@glimmer/component';
import { registerComponents } from 'glimmer-addon-test';

export default class App extends Application {
  constructor() {

    registerComponents(resolverConfiguration.app.rootName, moduleMap);

    let moduleRegistry = new BasicModuleRegistry(moduleMap);
    let resolver = new Resolver(resolverConfiguration, moduleRegistry);
    const element = document.body;

    super({
      builder: new DOMBuilder({ element, nextSibling: null }),
      loader: new RuntimeCompilerLoader(resolver),
      renderer: new SyncRenderer(),
      resolver,
      rootName: resolverConfiguration.app.rootName
    });
  }
}
