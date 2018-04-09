var app={
  inicio: function(){

    velocidadX = 0;
    velocidadY = 0;
    puntuacion = 0;
    dificultad = 0;

    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;
    
    app.vigilaSensores();
    app.iniciaJuego();

  },

  numeroAleatorioHasta: function(limite){
    return Math.floor(Math.random() * limite);
  },


  iniciaJuego: function(){

    function preload() {

      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = '#f27d0c';
      game.load.image('paracaidas', 'assets/paracaidismo.png');
      game.load.image('bote', 'assets/icon.png');
      game.load.image('mar', 'assets/mar.png');
      game.load.image('tiburon', 'assets/tiburon.png');

    }

    function create() {
      scoreText = game.add.text(16, 16, puntuacion, { fontSize: '100px', fill: '#757676' });
      
      //se dibujan los objetos:
      bote = game.add.sprite(100, 450, 'bote');
      paracaidas = game.add.sprite(app.inicioX(), 1, 'paracaidas');
      mar = game.add.sprite(1, 500, 'mar');
      bote.width = 100;
      bote.height = 100;
      paracaidas.width = 50;
      paracaidas.height = 50;
      mar.width = 1000;
      mar.height = 50;
      
      game.physics.arcade.enable(bote);
      game.physics.arcade.enable(paracaidas);
      game.physics.arcade.enable(mar);

      bote.body.collideWorldBounds = true;
      bote.body.onWorldBounds = new Phaser.Signal();
      paracaidas.body.collideWorldBounds = true;
      paracaidas.body.onWorldBounds = new Phaser.Signal();

      paracaidas.body.gravity.y = 100;
  
    }

    function update(){
    

      var factorDificultad = (300 + (dificultad * 100));
      bote.body.velocity.x = (velocidadX * (-1 * factorDificultad));
      
      game.physics.arcade.overlap(paracaidas, bote, app.incrementaPuntuacion, null, this);
      game.physics.arcade.overlap(paracaidas, mar, app.decrementaPuntuacion, null, this);


    }

    var estados = { preload: preload, create: create, update: update };
    var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);
  },

  incrementaPuntuacion: function(){
    puntuacion = puntuacion + 1; 
     scoreText.text = puntuacion;

 
       paracaidas.body.x = app.inicioX();
    paracaidas.body.y = 1;

    /*if (puntuacion > 0 && dificultad < 10){
      dificultad = dificultad + 1;
    }*/

  },
  vigilaSensores: function(){
    
    function onError() {
        console.log('onError!');
    }

    function onSuccess(datosAceleracion){
      //app.detectaAgitacion(datosAceleracion);
      app.registraDireccion(datosAceleracion);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
  },

  decrementaPuntuacion: function(){
    puntuacion = puntuacion-1;
    scoreText.text = puntuacion;

    paracaidas.body.x = app.inicioX();
    paracaidas.body.y = 1;
paracaidas.body.velocity.y = -100;
       /*if (dificultad > 0){
      dificultad = dificultad - 1;
    }*/

  },

  inicioX: function(){
    return app.numeroAleatorioHasta(ancho - 50);
  },

  registraDireccion: function(datosAceleracion){
    velocidadX = datosAceleracion.x ;
    //velocidadY = datosAceleracion.y ;
  }


};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}