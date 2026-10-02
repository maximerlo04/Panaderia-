from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('panaderia.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def Home():
    conn = get_db_connection()
    lista_productos = conn.execute('SELECT * FROM productos LIMIT 8').fetchall()
    conn.close()
    return render_template('index.html', productos=lista_productos)

@app.route('/productos')
def productos():
    categoria = request.args.get('categoria')
    conn = get_db_connection()

    if categoria:
        lista_productos = conn.execute(
            'SELECT * FROM productos WHERE categoria = ?', (categoria,)
        ).fetchall()
    else:
        lista_productos = conn.execute ('SELECT * FROM productos').fetchall()

    conn.close()
    return render_template('products.html', productos=lista_productos)

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/health')
def health():
    return 'ok', 200

if __name__ == '__main__':
    app.run(debug=True)