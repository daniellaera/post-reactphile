
/*Create user table in public schema*/
CREATE TABLE public.user (
    id SERIAL PRIMARY KEY,
    username TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.user IS
'Forum users.';

/*Create post table in public schema*/
CREATE TABLE public.post (
    id SERIAL PRIMARY KEY,
    title TEXT,
    body TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER NOT NULL REFERENCES public.user(id)
);

COMMENT ON TABLE public.post IS
'Forum posts written by a user.';

/*Create some dummy users*/
INSERT INTO public.user (username) VALUES
('Benjie'),
('Singingwolfboy'),
('Lexius');

/*Create some dummy posts*/
INSERT INTO public.post (title, body, author_id) VALUES
('First post example', 'Lorem ipsum dolor sit amet', 1),
('Second post example', 'Consectetur adipiscing elit', 2),
('Third post example', 'Aenean blandit felis sodales', 3);