let UserService = function($http, API, $cookies, $state, $rootScope){

  function getUserInfo(){
    $http.get(`${API.URL}/me`)
      .success((data) => {
        $rootScope.userName = data.name;
        $rootScope.userItems = data.items;
      });
  }

  function checkUser(){
    const token = $cookies.get('token');
    if(token){
      getUserInfo();
      _setToken(token);
    }
  }

  function _setToken(token){
    if(token){
      API.CONFIG.headers['x-access-token'] = token;
      $rootScope.isUserLoggedIn = true;
    }else{
      $rootScope.isUserLoggedIn = false;
    }
  }

  function wholesaleRequest(email){
    return $http.post(`${API.URL}/contact/wholesale`, email);
  }

  function contact(email){
    return $http.post(`${API.URL}/contact`, email);
  }

  function login(user){
    $http.post(`${API.URL}/authenticate`, user)
      .success((data) => {
        _successLog(data);
      });
  }

  function _successLog(data){
    $cookies.put('token', data.token);
  }

  function _updateUser(userId, user){
    return $http.put(`${API.URL}/users/${userId}`, user, API.CONFIG);
  }

  function logOut(){
    $cookies.remove('token');
    _setToken();
    $state.go('home');
  }

  function _getUser(userId){
    return $http.get(`${API.URL}/users/${userId}`, API.CONFIG);
  }

  function forgotPassword(email){
    return $http.post(`${API.URL}/forgotPassword`, email);
  }

  function _deleteUser(userId){
    return $http.delete(`${API.URL}/users/${userId}`);
  }

  return{
    checkUser,
    wholesaleRequest,
    contact,
    login,
    logOut,
    _updateUser,
    _getUser,
    _deleteUser,
    forgotPassword

  };
};

export default UserService;
