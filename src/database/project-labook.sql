-- Active: 1684928761418@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO users (id, name, email, password, role) VALUES  
        ('U001', 'AstroDev', 'astrodev@dev.com', 'admin', 'ADMIN'), 
        ('U002', 'DevTester', 'devtester@dev.com','12345', 'NORMAL'),
        ('U003', 'Renan', 'renan@email.com','renan123', 'NORMAL');

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT (0) NOT NULL,
        dislikes INTEGER DEFAULT (0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO posts (id, creator_id, content) VALUES
        ('P001','U001','Bora pro Teste!'), 
        ('P002', 'U002', 'Testado!!!');

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL, 
        post_id TEXT NOT NULl,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
    );

INSERT INTO likes_dislikes VALUES  
        ('U002', 'P001', 1), 
        ('U003', 'P001', 1),
        ('U001', 'P002', 1),
        ('U003', 'P002', 0);


UPDATE posts 
SET likes = 2
WHERE id = 'P001';

UPDATE posts 
SET likes = 1, dislikes = 1
WHERE id = 'P002';

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

DROP TABLE users;

DROP TABLE posts;

DROP TABLE likes_dislikes;

