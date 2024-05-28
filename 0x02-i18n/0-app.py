#!/usr/bin/env python3


"""setup a basic Flask app"""


from flask import render_template


from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()
