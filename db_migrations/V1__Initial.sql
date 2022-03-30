CREATE SCHEMA utils;

/*Create user table in public schema*/
CREATE TABLE public.user (
    user_id SERIAL PRIMARY KEY,
    username TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE public.user IS
'Forum users.';

/*Create post table in public schema*/
CREATE TABLE public.post (
    post_id SERIAL PRIMARY KEY,
    title TEXT,
    body TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INTEGER NOT NULL REFERENCES public.user(user_id)
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


CREATE OR REPLACE FUNCTION utils.notify_my_table_update() RETURNS TRIGGER AS $$
    BEGIN
    PERFORM pg_notify('postgraphile:hello', 
    json_build_object(
    '__node__', json_build_array(
      'posts',
      (select max(post_id) from public.post)
    )
  )::text
    );
    RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_my_table_update ON post;
CREATE TRIGGER trigger_my_table_update
  AFTER UPDATE OR DELETE OR INSERT OR TRUNCATE
  ON post
  EXECUTE PROCEDURE utils.notify_my_table_update();


-- INSERT INTO public.post (title, body, author_id) values ('final title', 'final body', 3) returning *;