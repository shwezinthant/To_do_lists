$(document).ready(function () {
  function renderTodoLists() {
    var item_string = localStorage.getItem("Lists");
    var item_arr = JSON.parse(item_string);
    if (item_arr) {
      var html = "";
      item_arr.forEach((element) => {
        html += `
    <div class="row">
    <div class="col-10">
      <p>${element.item_name}</p>
    </div>
    <div class="col-2">
      <i
        class="fa-solid fa-pen-to-square mx-1 edit"
        style="font-size: small; color: forestgreen"
        data-id="${element.id}"  data-name="${element.item_name}"
      ></i>
      <i
        class="fa-solid fa-trash delete"
        style="font-size: small; color: red" data-id="${element.id}"
      ></i>
    </div>
  </div>    `;
      });
      $("#todoLists").html(html);
      $("#clearLists").removeClass("d-none");
      $("#clearLists").addClass("d-block");
    } else {
      $("#todoLists").html(`<p class="text-danger">No to do Lists</p>`);
      $("#clearLists").addClass("d-none");
    }
  }
  renderTodoLists();
  var isEditing = false;
  var isEditing_id = "";

  $("#submit").click(function () {
    var item = $("#item").val();
    if (item == "") {
      $("#item").addClass("is-invalid");
      return;
    }
    $("#item").removeClass("is-invalid");

    var item_string = localStorage.getItem("Lists");
    var item_arr = JSON.parse(item_string);
    if (item_arr) {
      var item_Arr = item_arr;
    } else {
      var item_Arr = [];
    }

    if (isEditing == false) {
      var id = new Date().getTime().toString();
      var store_item = {
        id: id,
        item_name: item,
      };
      item_Arr.push(store_item);
    } else {
      item_Arr.forEach((element) => {
        if (isEditing_id == element.id) {
          element.item_name = item;
        }
      });
      isEditing = false;
      isEditing_id = "";
      $("#submit").text("Submit");
    }

    localStorage.setItem("Lists", JSON.stringify(item_Arr));
    renderTodoLists();
    $("#item").val(null);
    $("#item").focus();
  });

  $("#clearLists").click(function () {
    localStorage.removeItem("Lists");
    renderTodoLists();
  });

  $("#todoLists").on("click", ".delete", function () {
    var item_id = $(this).data("id");
    var item_string = localStorage.getItem("Lists");
    var item_arr = JSON.parse(item_string);
    item_arr.forEach((element, index) => {
      if (item_id == element.id) {
        item_arr.splice(index, 1);
      }
    });
    localStorage.setItem("Lists", JSON.stringify(item_arr));
    renderTodoLists();
  });

  $("#todoLists").on("click", ".edit", function () {
    var item_id = $(this).data("id");
    var item_name = $(this).data("name");
    isEditing = true;
    isEditing_id = item_id;

    $("#item").val(item_name);
    $("#submit").text("Edit");
  });
});
