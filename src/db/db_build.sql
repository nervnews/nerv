BEGIN;

    DROP TABLE IF EXISTS users,topics CASCADE;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        fb_id INTEGER NOT NULL,
        name VARCHAR(20) NOT NULL
    );

    CREATE TABLE topics (
        t_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        topic VARCHAR(50) NOT NULL
    );

COMMIT;
