#!/usr/bin/env python3


"""setup a basic Flask app"""


from flask import render_template, request
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


@babel.localeselector
def get_locale():
    """get_locale function

    """
    locale = request.args.get("locale")
    if locale and locale in app.config["LANGUAGES"]:
        return locale
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route('/')
def hello():
    """return html template

    """
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run()
