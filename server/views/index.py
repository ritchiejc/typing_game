from flask import Blueprint, render_template, request
from flask.ext.login import login_required
from flask.ext.login import current_user

import os, sys

from models.database_access import *

index = Blueprint('index', __name__)

@index.route('/')
def show():
    login = False
    name = None
    if current_user.is_authenticated():
        login = True 
        if current_user.name:
            name = current_user.name
        else:
            name = current_user.username
    return render_template('index.html',login=login,name=name)

@index.route('/Game')
def game():
    login = False
    name = None
    level = None
    if current_user.is_authenticated():
        login = True 
        if current_user.name:
            name = current_user.name
            level = current_user.highest_level
        else:
            name = current_user.username
    return render_template('Game.html', login=login, name=name, level_selected=level)

@index.route('/Game/DownloadMap', methods=['POST'])
def downloadMap():
	mapID = int(request.form['id'])
	dac = database_access()
	return dac.get_map_with_items(mapID)
	
