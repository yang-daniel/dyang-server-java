var $usernameFld, $passwordFld
var $firstNameFld, $lastNameFld, $roleFld

var $removeBtn, $editBtn, $createBtn
var $userRowTemplate, $tbody

var userService = new AdminUserServiceClient()

var users = [
  {username: "GTimeee", password: "cool123", firstname: "Gordon", lastname: "Hayward", role: "Staff"},
  {username: "DrOct", password: "888", firstname: "Otto", lastname: "Octavius", role: "Faculty"},
  {username: "Spdrmn", password: "  ", firstname: "Peter", lastname: "Parker", role: "Student"},
  {username: "GreenGoblin", password: "Green", firstname: "Norman", lastname: "Osborn", role: "Faculty"},
  {username: "Venom", password: "symbiote", firstname: "Eddie", lastname: "Brock", role: "Student"},
  {username: "Mysterio", password: "Sinister6", firstname: "Quentin ", lastname: "Beck", role: "Faculty"}
]

function createUser() {
  var newUser = {
    username: $usernameFld.val(),
    password: $passwordFld.val(),
    firstname: $firstNameFld.val(),
    lastname: $lastNameFld.val(),
    role: $roleFld.val()
  }
  userService.createUser(newUser).then(function (realUser) {
    users.push(realUser)
    renderUsers(users)
  })
  clearForm();
}

function deleteUser(event) {
  var button = $(event.target)
  var index = button.attr("id")
  var id = users[index]._id
  userService.deleteUser(id).then(function (status) {
    users.splice(index, 1)
    renderUsers(users)
  })
}

var selectedUser = null
function selectUser(event) {
  var id = $(event.target).attr("id")
  console.log(id)
  selectedUser = users.find(user => user._id === id)
  $usernameFld.val(selectedUser.username)
  $passwordFld.val(selectedUser.password)
  $firstNameFld.val(selectedUser.firstname)
  $lastNameFld.val(selectedUser.lastname)
  $roleFld.val(selectedUser.role)
}

function updateUser() {
  selectedUser.username = $usernameFld.val()
  selectedUser.password = $passwordFld.val()
  selectedUser.firstname = $firstNameFld.val()
  selectedUser.lastname = $lastNameFld.val()
  selectedUser.role = $roleFld.val()
  userService.updateUser(selectedUser._id, selectedUser).then(status => {
    var index = users.findIndex(user => user._id === selectedUser._id)
    users[index] = selectedUser
    renderUsers(users)
    clearForm();
  })
}

function renderUsers(users) {
  $userRowTemplate.empty()
  for(var i=0; i<users.length; i++) {
    var user = users[i]
    $userRowTemplate
    .prepend(`
      <tr>
          <td>${user.username}</td>
          <td class="hidetext user-${i}-pwd">${user.password}</td>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.role}</td>
          <td>
            <i class="fas fa-trash fa-2x wbdv-delete-btn" id="${i}" ></i>
            <i class="fas fa-pencil-alt fa-2x wbdv-select-btn" id="${user._id}"></i>
          </td>
      </tr> 
     `)
  }

  $(".wbdv-delete-btn").click(deleteUser)
  $(".wbdv-select-btn").click(selectUser)
}

function clearForm() {
  $usernameFld.val('')
  $passwordFld.val('')
  $firstNameFld.val('')
  $lastNameFld.val('')
  $roleFld.val('')
}

function main() {
  $userRowTemplate = $("#table-rows")
  $createBtn = $(".wbdv-create-btn")
  $editBtn = $(".wbdv-edit-btn")

  $usernameFld = $(".wbdv-username-fld")
  $passwordFld = $(".wbdv-password-fld")
  $firstNameFld = $(".wbdv-firstname-fld")
  $lastNameFld = $(".wbdv-lastname-fld")
  $roleFld = $(".wbdv-role-fld")

  $editBtn.click(updateUser)
  $createBtn.click(createUser)

  userService.findAllUsers().then(function (actualUsers) {
    users = actualUsers
    renderUsers(users)
  })
}

$(main)