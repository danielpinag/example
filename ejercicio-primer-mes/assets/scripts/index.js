var pageNumber = 1;

function previousPage(){
  pageNumber = pageNumber - 1;
  $(".avatar-card").remove()
  $(".change-page").remove()
  loadPage()
  changeUrl(pageNumber);
}

function nextPage(){
  pageNumber = pageNumber + 1;
  $(".avatar-card").remove()
  $(".change-page").remove()
  loadPage()
  changeUrl(pageNumber);
}

function changeUrl(pageNumber){
  window.history.pushState({}, "Avatares", `?page=${pageNumber}`);
}

function loadPage(){
  var queryURL = `https://reqres.in/api/users?page=${pageNumber}`;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    const departmentArrays = response.data;
    var departmentBox = "";
    const pagination = `${response.page} de ${response.total_pages}`
    $(".page").empty().append(pagination);
    var previousPageButton = "";
    var nextPageButton = "";
    if(pageNumber > 1){
      previousPageButton = `<div class="change-page" onclick="previousPage()"><</div>`
      $(".previous-page").empty().append(previousPageButton);
    };
    if(pageNumber < response.total_pages){
      nextPageButton = `<div class="change-page" onclick="nextPage()">></div>`
      $(".next-page").empty().append(nextPageButton);
    };
    departmentArrays.forEach(function(avatar) {
      departmentBox = 
      `<div class="avatar-card">
         <div class="avatar-data">
           <div class="card-left">
             <img src="${avatar.avatar}" class="avatar-image">
           </div>
           <div class="card-right">
             <div class="avatar-id">${avatar.id}</div>
             <div class="avatar-name">${avatar.first_name} ${avatar.last_name}</div>
             <div class="avatar-phone">+52 1 999 234 5678</div>
           </div>
           <div class="card-bottom">
             <div class="avatar-email">${avatar.email}</div>
           </div>
         </div> 
       </div>`;
      $(".avatar-zone").append(departmentBox)
    });
  });
};