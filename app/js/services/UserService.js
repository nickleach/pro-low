let UserService = function($http, API, $cookies, $state, $rootScope){

  function wholesaleRequest(email){
    return $http.post(`${API.URL}wholesale`, email);
  }

  function contact(email){
    return $http.post(`${API.URL}contact`, email);
  }

  function login(user){
    return $http.post(`${API.URL}authenticate`, user);
  }

  function _updateUser(userId, user){
    return $http.put(`${API.URL}users/${userId}`, user, API.CONFIG);
  }

  function _getUser(userId){
    return $http.get(`${API.URL}users/${userId}`, API.CONFIG);
  }

  function forgotPassword(email){
    return $http.post(`${API.URL}forgotPassword`, email);
  }

  function _deleteUser(userId){
    return $http.delete(`${API.URL}users/${userId}`);
  }

  return{
    contact,
    login,
    _updateUser,
    _getUser,
    _deleteUser,
    forgotPassword

  };
};

export default UserService;
