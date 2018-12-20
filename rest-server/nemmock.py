#!flask/bin/python

from flask import Flask, jsonify, abort, request, make_response, url_for
from flask import abort, Response
from flask_httpauth import HTTPBasicAuth
import json
import logging

# ENP data
from enpnes import enpnes
from enptunnels import tunnels
from enplinks import links
from enplsps import workingLSPs, protectingLSPs

auth = HTTPBasicAuth()

app = Flask(__name__)




@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/enp/links', methods=['GET'])
def get_links():
	response = Response(response= json.dumps(links), mimetype = 'application/json', status=200) 
	return response
	
@app.route('/enp/nes', methods=['GET'])
def get_enpnes():
    # SHOULD BE : return jsonify({'enpnes': enpnes})
	#
	# jsonify prevents you from doing this for security reasons.
	# http://flask.pocoo.org/docs/0.10/security/#json-security
	response = Response(response= json.dumps(enpnes), mimetype = 'application/json', status=200) 
	return response


@app.route('/enp/tunnels', methods=['GET'])
def get_tunnels():
	
	if 'name' in request.args:
		name = request.args.get('name')
		app.logger.info('get tunnel for name = ', name)
		tunnel = [tunnel for tunnel in tunnels if name in tunnel['name']]
		if len(tunnel) == 0:
			abort(404)
		response = Response(response= json.dumps(tunnel), mimetype = 'application/json', status=200)
		return response		
	
	if 'id' in request.args:
		id = int(request.args.get('id'))
		tunnel = [tunnel for tunnel in tunnels if int(tunnel['id']) == int(id)]			
		if len(tunnel) == 0:
			abort(404)
		response = Response(response= json.dumps(tunnel), mimetype = 'application/json', status=200)
		return response		

	# returns all tunnels
	response = Response(response= json.dumps(tunnels), mimetype = 'application/json', status=200)	
	return response

@app.route('/enp/nes/<int:ne_id>', methods=['GET'])
def get_enpne(ne_id):
	ne = [ne for ne in enpnes if enpnes['neId'] == ne_id]

	if len(ne) == 0:
		abort(404)

	response = Response(response= json.dumps(ne), mimetype = 'application/json', status=200)
	return response

	
@app.route('/enp/tunnels/<int:tunnel_id>', methods=['GET'])
def get_tunnel(tunnel_id):
	tunnel = [tunnel for tunnel in tunnels if tunnel['id'] == tunnel_id]
	if len(tunnel) == 0:
		abort(404)
	response = Response(response= json.dumps(tunnel), mimetype = 'application/json', status=200)
	return response


	
@app.route('/enp/tunnels/<int:tunnel_id>/workingLSP', methods=['GET'])
def get_tunnel_workingLSP(tunnel_id):
	lsp = [lsp for lsp in workingLSPs if lsp['tunnelId'] == tunnel_id]
	if len(lsp) == 0:
		abort(404)
	response = Response(response= json.dumps(lsp[0]), mimetype = 'application/json', status=200)
	return response

@app.route('/enp/tunnels/<int:tunnel_id>/protectingLSP', methods=['GET'])
def get_tunnel_protectingLSP(tunnel_id):
	lsp = [lsp for lsp in protectingLSPs if lsp['tunnelId'] == tunnel_id]
	if len(lsp) == 0:
		abort(404)
	response = Response(response= json.dumps(lsp[0]), mimetype = 'application/json', status=200)
	return response

@app.route('/users/authenticate', methods=['POST', 'OPTIONS'])
def user():
	app.logger.info('start user')
	
	if request.method == 'OPTIONS':
		app.logger.info('method is OPTIONS')	
		response = Response(mimetype = 'application/json', status=200)
		return response		
		
	request_body = json.loads(request.data)
	try:
		username = str(request_body['username'])
		app.logger.info('test get user %s', username)
		user = {"user" : username, "token": 5}  
		response = jsonify(user)

	except:
		response = jsonify({'result': 'error'})
		response.status_code = 500
		
	return response
	
	#response = Response(response= jsonify(user), mimetype= 'application/json', status=200)
	#response.headers.add('Access-Control-Allow-Origin', '*')
	#return response
	
	#print "user = " + POST_USERNAME +  " password = "+  POST_PASSWORD
	
	# Session = sessionmaker(bind=engine)
	# s = Session()
	# query = s.query(User).filter(User.username.in_([POST_USERNAME]), User.password.in_([POST_PASSWORD]) )
	# result = query.first()
	#if request.form['password'] == 'password' and request.form['username'] == 'admin':
	#	session['logged_in'] = True
	#	app.logger.info("logged_in")
	#else:
	#	flash('wrong password!')
    
	
	
	#response = Response(response= json.dumps(user), mimetype= 'application/json', status=201)
	#response.headers.add('Access-Control-Allow-Origin', '*')
	#return response
	
 
@app.route("/logout")
def logout():
	session['logged_in'] = False
	response = Response(mimetype = 'application/json', status=200)
	return response	
    
	
@auth.get_password
def get_password(username):
	if username == 'lionel':
		return 'python'
	return None


@auth.error_handler
def unauthorized():
	return make_response(jsonify({'error': 'Unauthorized access'}), 401)


@app.after_request
def after_request(response):
	response.headers.add("Access-Control-Allow-Origin", "*")
	response.headers.add("Access-Control-Allow-Credentials", "true")
	response.headers.add("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
	response.headers.add("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
	return response
	
if __name__ == '__main__':
	app.run(debug=True)
