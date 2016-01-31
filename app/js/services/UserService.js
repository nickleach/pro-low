let UserService = function($http, API, $cookies, $state, $rootScope, $log){

  function getUserInfo(){
    return $http.get(`${API.URL}/me`, API.CONFIG);
  }

  function checkUser(){
    const
      token = $cookies.get('token'),
      username = $cookies.get('username');
    if(token && username){
      _setToken(token, username);
    }
  }

  function _setToken(token, username){
    if(token && username){
      API.CONFIG.headers['x-access-token'] = token;
      $rootScope.isUserLoggedIn = true;
      $rootScope.username = username;
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
    $cookies.put('userId', data.id);
    _setToken(data.token);
    getUserInfo()
      .success((userData) =>{
        $log.debug('User data', userData);
        $cookies.putObject('items', userData.items);
        $cookies.put('username', userData.username);
      });
    $state.go('buyWholesale');
    $log.debug('Logged in!', data);
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
    forgotPassword,
    getUserInfo

  };
};

export default UserService;
