export const environment = {
    production: true,
    localDatabase: {
        company: {
            dbName: 'company',
            collections: [
                { name: 'cache', schema: 'any' }
            ]
        },
        nao: {
            dbName: 'nao',
            collections: [
                { name: 'sessions', schema: 'any' },
                { name: 'companycache', schema: 'any' },
            ]
        }
    },
    API: {
        server: {
            $id: 'server',
            protocol: 'https',
            port: 443,
            url: process.env.API_URL,
            prefix: 'api/v2/',
            ssl: true
        },
        naoToken: process.env.NAO_TOKEN,
        webSocket: {
            enabled: false
        },
        basicAuth: {
            user: 'gabriel',
            password: 'gabriel'
        }
    },
    naoUsers: {
        ws: {
            enabled: false,
        },
        users: {
            updateEverySeconds: 60 * 5,
        },
        subscribeTo: {
            companyUpdates: true,
            userUpdates: true,
        },
        api: { root: 'users-auth/auth' },
        cfpPath: 'ecommerce-api/ecommerce-api',
        naoQueryOptions: {
            docName: 'guest-external-ecommerce',
            cfpPath: 'users/users',
            userMode: 'guest-external',
        },
    },
};
