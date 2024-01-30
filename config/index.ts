/**
 *        @file index.js
 *  @repository roadmapo-web-backend
 * @application roadmapo-web-backend
 *     @summary Server-specific configuration settings for the APIs.
 * @description This is an example of the config file which holds all the confidential credentials.
 */

interface dbClient {
    user: string
    password: string | undefined
    database: string
    host: string
    port: number
    ssl: boolean | Object
}

/**
 * Database Connection Profile (Primary)
 * PostgreSQL database connection profile (object), used to make a privilaged server-side (non-application)
 * connection to the InnVoyce database.
 */
export const dbObjProduction: dbClient = {
    user: '',
    password: '',
    database: '',
    host: '',
    port: 0,
    ssl: {
        rejectUnauthorized: false,
    },
}

// Locahost Database
export const dbObjLocal: dbClient = {
    user: 'postgres',
    password: 'postgres',
    database: 'roadmapo',
    host: 'localhost',
    port: 5432,
    ssl: false
}

/**
 * Server Configuration
 */
export const server = {
    port: 9000,
}

/**
 * Client Configuration
 */
export const client = {
    port: 3000,
}

// OpenAI configuration
export const openaiConfig = {
    apiKey: "",
    baseUrl: "https://api.openai.com/v1/completions",
};

/**
 * Email Configuration
 * Postmark (https://postmarkapp.com/) is the email delivery service used for emails sent from the
 * InnVoyce database API (for invitation and password resets, for example). The official
 * Postmark-maintained Postmark.js package for Node.js is used to access a given virtual Postmark
 * server and utilize the Postmark API. Each Postmark server is intended to correspond to a given
 * code server, that is, one each for the dev, stage, and prod servers to which code is deployed.
 * Below, the Postmark Server API Token (pmServerApiToken) identifies and authenticates to a specific
 * Postmark server, from which all InnVoyce database API email on the associated code
 * server will be sent. Again, that Server API Token should differ across the various API code servers.
 * Also, note that the from address below must satisfy Postmark's Sender Signature requirements, that
 * is, it must be a verified domain or single email address.
 */

export const email = {
    primary: {
        token: '',
        from: 'support@roadmapo.com'
    },

    addresses: {
        support: 'support@roadmapo.com'
    }
};

/**
 * Generate a random password of your desired
 * length.
 */

export const randomPasswordLength = 10;
