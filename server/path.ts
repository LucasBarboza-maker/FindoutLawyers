// ------------------------------------------------------------------
// | [requirements]
// ------------------------------------------------------------------

import { Route, Routes } from '@vorlefan/path';

// ------------------------------------------------------------------
// | Main Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', __dirname);
    instance.alias('src', 'main');

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Main');

// ------------------------------------------------------------------
// | App Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('app').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'App');

// ------------------------------------------------------------------
// | Assets Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('assets').filepath);

    instance.inject('email', 'main');

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));

    instance
        .io()
        .folders('email')
        .map(({ name, path }) => instance.set(`email/${name}`, path));
}, 'Assets');

// ------------------------------------------------------------------
// | Assets Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('data').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Data');

// ------------------------------------------------------------------
// | Jobs Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('jobs').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Jobs');

// ------------------------------------------------------------------
// | Tasks Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', Route.Main.get('tasks').filepath);

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Tasks');

// ------------------------------------------------------------------
// | Upload Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set('main', instance.resolve(__dirname, '..', 'uploads'));

    instance
        .io()
        .folders('main')
        .map(({ name, path }) => instance.set(`${name}`, path));
}, 'Upload');

// ------------------------------------------------------------------
// | Upload Public Route
// ------------------------------------------------------------------

Routes.instance(({ instance }) => {
    instance.set(
        'root',
        instance.resolve(__dirname, '..', 'uploads', 'public')
    );
    instance.alias('main', 'root');

    instance
        .inject('blog_editor_images', 'root')
        .inject('blog_covers', 'root')
        .inject('news', 'root')
        .inject('users', 'root')
        .inject('banners', 'root');

    instance
        .io()
        .setFolder('users', 'cover')
        .setFolder('users', 'background')
        .setFolder('users', 'subscriptions');

    instance
        .io()
        .folders('root')
        .map(({ name, path }) => {
            instance.set(`${name}`, path);
            instance.structuredJoin(name);
        });
}, 'Public');

// ------------------------------------------------------------------
// | [export]
// ------------------------------------------------------------------

const DataRoute = Route.Data;
const AppRoute = Route.App;
const MainRoute = Route.Main;
const JobsRoute = Route.Jobs;
const TasksRoute = Route.Tasks;
const UploadRoute = Route.Upload;
const PublicRoute = Route.Public;
const AssetsRotue = Route.Assets;

export {
    Route,
    Routes,
    DataRoute,
    AppRoute,
    MainRoute,
    JobsRoute,
    TasksRoute,
    PublicRoute,
    AssetsRotue,
    UploadRoute,
};
