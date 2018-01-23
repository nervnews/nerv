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

    /*INSERT INTO users(fb_id, name) VALUES
    (12345678, "Mynah Test"),
    (87654321, "Marie Test")

    INSERT INTO topics(user_id, topic) VALUES
    (1, "israel"),
    (1, "canada"),
    (2, "trump")*/

COMMIT;

    

