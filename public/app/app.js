angular.module(`DesignDoc`,[`ui.router`]).config(function($urlRouterProvider, $stateProvider){
  $urlRouterProvider.otherwise(`/`);

  $stateProvider.state(`home`,{
    url: `/`,
    templateUrl: `./views/home.html`,
    controller: `navCtrl`
  }).state(`cases`,{
    url: `/cases/:type`,
    templateUrl: `./views/cases.html`,
    controller: `caseCtrl`
  }).state(`admin`,{
    url:`/admin`,
    templateUrl: `./views/admin.html`,
    controller: `adminCtrl`
  }).state('this',{
    url:'/about-this',
    templateUrl: './views/about-this.html',
    controller: 'aboutCtrl'
  }).state('me',{
    url: '/about-me',
    templateUrl: './views/about-me.html',
    controller: 'aboutCtrl'
  })

}).directive(`bgUpload`,function(adminService){
  return {
    restrict: `A`,
    contoller: 'adminCtrl',
    link: (scope,elem,attrs)=>{
      elem.bind(`change`,(changeEvent)=>{
        let reader=new FileReader();
        reader.onload=(loadEvent)=>{
          let fileread=loadEvent.target.result,
              name=elem[0].files[0].name;
          if(attrs.ngModel===`params.before`){
            scope.params.before={
                imageData: fileread,
              filename: name
            };
          }
          else if(attrs.ngModel===`params.after`){
            scope.params.after={
                imageData: fileread,
              filename: name
            };
          }
        }
        reader.readAsDataURL(changeEvent.target.files[0])
      })
    }
  }
})
