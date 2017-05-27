import React from 'react';
import { Router } from 'dva/router';

const cached = {};

function registerModel(app, model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}

function RouterConfig({ history, app }) {
    const routes = [{
            path: '/',
            name: 'Login',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/login'));
                    cb(null, require('./routes/Login/Login'));
                });
            },
        },
        {
            path: '/users',
            name: 'UsersPage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/users'));
                    cb(null, require('./routes/Users/Users.js'));
                });
            },
        },
        {
            path: '/movies',
            name: 'moviesPage',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/movie'));
                    cb(null, require('./routes/Movies/Movie.js'));
                });
            },
        },
    ];

    return <Router history = { history }
    routes = { routes }
    />;
}

export default RouterConfig;