from flask import Flask,render_template
app = Flask(__name__)


# for the FarmAnimal game
@app.route("/")
def main():
    return render_template('uvuv.html')

# for the virtualPet
# @app.route("/")
# def main():
#     return render_template('virtualPet.html')
    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0' , port=8080)