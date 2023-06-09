CREATE TABLE IF NOT EXISTS users
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    date_created TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_uindex
    ON users (email);

CREATE UNIQUE INDEX IF NOT EXISTS users_id_uindex
    ON users (id);



CREATE TABLE IF NOT EXISTS sessions
(
    id            BIGSERIAL    NOT NULL PRIMARY KEY,
    user_id       BIGINT       NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    date_created  TIMESTAMP    NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS events
(
    id            BIGSERIAL    NOT NULL PRIMARY KEY,
    timestamp  TIMESTAMP NOT NULL,
    app        TEXT      NOT NULL,
    user_id    TEXT      NOT NULL,
    device     TEXT      NOT NULL,
    country    TEXT      NOT NULL,
    session    TEXT      NOT NULL,
    log_type   TEXT      NOT NULL,
    event_type TEXT      NOT NULL,
    meta_data  JSONB
);
