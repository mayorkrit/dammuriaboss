-- Создаём таблицу для e-mail’ов
CREATE TABLE IF NOT EXISTS emails (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Создаём таблицу продуктов
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

-- Вставляем демо-товары
-- INSERT INTO products (title, image_url, description, price) VALUES
--   ('Product A', '/assets/prod-a.jpg', 'Описание A', 19.99),
--   ('Product B', '/assets/prod-b.jpg', 'Описание B', 29.99)
ON CONFLICT DO NOTHING;
