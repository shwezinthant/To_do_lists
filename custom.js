$(document).ready(function () {
  function renderTodoLists() {
    var item_string = localStorage.getItem("Lists");
    var item_arr = JSON.parse(item_string);
    console.log(item_arr);
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
      </div>
        `;
      });
      $("#todoLists").html(html);
    } else {
      $("#todoLists").html(`<p class="text-danger">No to do Lists</p>`);
      $("#clearLists").addClass("d-none");
    }
  }
  renderTodoLists();
  var isEditing = false;
  var isEditingId = "";
  $("#submit").click(function () {
    var item_string = localStorage.getItem("Lists");
    var item_arr = JSON.parse(item_string);
    console.log(item_arr);
    if (item_arr) {
      var item_Arr = item_arr;
    } else {
      var item_Arr = [];
    }

    var item = $("#item").val();
    if (isEditing == true) {
      console.log("edit_id", isEditingId);
      //for editing
      item_Arr.forEach((element) => {
        if (element.id == isEditingId) {
          element.item_name = item;
        }
      });
      isEditing = false;
      isEditingId = "";
      $("#submit").text("Submit");
    } else {
      //for new item
      var id = new Date().getTime().toString();
      var storeItem = {
        id: id,
        item_name: item,
      };
      item_Arr.push(storeItem);
    }

    localStorage.setItem("Lists", JSON.stringify(item_Arr));
    $("#item").val(null);
    $("#item").focus();
    renderTodoLists();
  });

  $("#clearLists").click(function () {
    localStorage.removeItem("Lists");
    renderTodoLists();
  });

  $(".edit").click(function () {
    console.log("ok");
  });
  $("#todoLists").on("click", ".delete", function () {
    var list_id = $(this).data("id");
    var list_str = localStorage.getItem("Lists");
    var list_arr = JSON.parse(list_str);
    console.log("id", list_id);
    list_arr.forEach((element, index) => {
      // console.log("element_id", element.id);
      // console.log("index", index);
      if (list_id == element.id) {
        list_arr.splice(index, 1);
      }
    });

    localStorage.setItem("Lists", JSON.stringify(list_arr));
    renderTodoLists();
  });

  $("#todoLists").on("click", ".edit", function () {
    var list_id = $(this).data("id");
    var name = $(this).data("name");
    $("#item").val(name);
    $("#submit").text("Edit");
    isEditing = true;
    isEditingId = list_id;
  });
});
