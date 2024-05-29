#!/usr/bin/env python3


"""setup a basic Flask app"""


from flask import render_template, request, g
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


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """get_user functon

    """
    try:
        user_id = int(request.args.get("login_as"))
        return users.get(user_id)
    except (TypeError, ValueError):
        return None


@app.before_request
def before_request():
    """before_request

    """
    g.user = get_user()


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
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run()
    babel.init_app(app, locale_selector=get_locale)
