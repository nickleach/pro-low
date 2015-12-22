function MediaController($scope){

    $scope.test = function(){
      console.log('worked');
    };

    $scope.images = [
      {
        thumb: 'assets/thumbs/closeup1-compressor_tn.jpg',
        img: 'assets/images/closeup1-compressor.jpg',
        description: ''
      },
      {
        thumb: 'assets/thumbs/kevin-compressor_tn.jpg',
        img: 'assets/images/kevin-compressor.jpg',
        description: ''
      },
      {
        thumb: 'assets/thumbs/main-compressor_tn.jpg',
        img: 'assets/images/main-compressor.jpg',
        description: ''
      },
      // {
      //   thumb: 'assets/thumbs/main3-compressor_tn.jpg',
      //   img: 'assets/images/main3-compressor.jpg',
      //   description: ''
      // },
      {
        thumb: 'assets/thumbs/landscape1-compressor_tn.jpg',
        img: 'assets/images/landscape1-compressor.jpg',
        description: ''
      },
      {
        thumb: 'assets/thumbs/landscape2-compressor_tn.jpg',
        img: 'assets/images/landscape2-compressor.jpg',
        description: ''
      },
      {
        thumb: 'assets/thumbs/landscape3-compressor_tn.jpg',
        img: 'assets/images/landscape3-compressor.jpg',
        description: ''
      },
      {
        thumb: 'assets/thumbs/landscape4-compressor_tn.jpg',
        img: 'assets/images/landscape4-compressor.jpg',
        description: ''
      },
      {
        thumb: 'assets/thumbs/landscape5-compressor_tn.jpg',
        img: 'assets/images/landscape5-compressor.jpg',
        description: ''
      }
    ];

}

export{
  MediaController
};
