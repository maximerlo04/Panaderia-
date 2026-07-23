import sqlite3

conn = sqlite3.connect('panaderia.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio INTEGER NOT NULL,
        categoria TEXT NOT NULL,
        imagen TEXT
    )
''')

productos = [
    ('Miñones', 1800, 'pan', 'minones.jpg'),
    ('Chipa', 1800, 'salado', 'chipa.jpg'),
    ('Cheesecake', 4200, 'tortas', 'cheesecake.jpg'),
    ('Medialunas', 2400, 'facturas', 'medialunas.jpg'),
]

cursor.executemany(
    'INSERT INTO productos (nombre, precio, categoria, imagen) VALUES (?, ?, ?, ?, ?)',
    productos
)

conn.commit()
conn.close()
print('Base de datos creada con productos de ejemplo.')