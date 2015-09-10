import BuilderManager from './BuilderManager';

export default async function build(enabledBuilders, options={}) {
  const manager = new BuilderManager(enabledBuilders);

  await manager.build(options);

  manager.renderErrors();
}
