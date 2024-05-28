#!/usr/bin/env python3


"""setup a basic Flask app"""


from flask import render_template
from flask_babel import Babel
from flask import Flask


class Config:
    """Config class

    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def hello():
    """return html template

    """
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run()
