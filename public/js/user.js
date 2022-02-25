const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function edit(_id, firstName, email, lastName) {
  let select_id = document.getElementById("_id");
  let select_firstName = document.getElementById("firstName");
  let select_email = document.getElementById("email");
  let select_lastName = document.getElementById("lastName");
  select_id.value = _id;
  select_firstName.value = firstName;
  select_email.value = email;
  select_lastName.value = lastName;
}
async function updateUser() {
  let _id = document.getElementById("_id").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  const updateUser = {
    firstName: firstName,
    lastName: lastName,
  };

  if (firstName.length === 0 || lastName.length === 0) {
    return $.notify("Please enter valid input", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  await fetch(`${CONSTANT.API}users/${_id}/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => {
      $.notify("User updated successfully", {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
      $("#edit").modal("hide");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
      $("#edit").modal("hide");
    });
}
async function selectDeleteEbook(_id) {
  let select_id = document.getElementById("_idDelete");
  select_id.value = _id;
  console.log(_id);
}
async function deleteAudioBook(_id) {
  let select_id = document.getElementById("_idDelete");
  select_id.value = _id;
  console.log(_id);
}
function editAudiobook(id, title, shortNote, author, category) {
  let select_id = document.getElementById("id");
  select_id.value = id;
  let selected_category = document.getElementById("edit_category");
  selected_category.value = category;
  let select_title = document.getElementById("edit_title");
  select_title.value = title;
  let select_shortNote = document.getElementById("edit_shortNote");
  select_shortNote.value = shortNote;
  let select_author = document.getElementById("edit_author");
  select_author.value = author;
}
async function updateAudioBook() {
  let id = document.getElementById("id").value;
  let title = document.getElementById("edit_title").value;
  let shortNote = document.getElementById("edit_shortNote").value;
  let author = document.getElementById("edit_author").value;
  let category = document.getElementById("edit_category").value;
  let image = document.getElementById("edit_image").files[0];
  const data = {
    title: title,
    shortNote,
    author,
    image,
    category,
  };
  console.log(data);
  let formData = new FormData();
  formData.append("title", title);
  formData.append("shortNote", shortNote);
  formData.append("author", author);
  formData.append("synopsis", category);
  formData.append("image", image);
  formData.append("category", category);
  // trackFiles.map((data, index) => {
  //   if (data) return formData.append(`track[${[index]}]`, data);
  // });
  // trackName.map((data, index) => {
  //   if (data.length > 0) return formData.append(`track[${[index]}][track]`, data);
  // });
  // // console.log(make_id);
  // if (
  //   title.length === 0 ||
  //   shortNote.length === 0 ||
  //   author.length === 0 ||
  //   synopsis.length === 0 ||
  //   image.length === 0 ||
  //   ebook.length === 0 ||
  //   chapter.length === 0
  // ) {
  //   // document.getElementById('loader').classList.remove('is-active');
  //   return $.notify("Please enter valid input and file ", {
  //     className: "error",
  //     clickToHide: true,
  //     autoHide: true,
  //     globalPosition: "top center",
  //   });
  // }

  try {
    await fetch(`${CONSTANT.API}books/audio/edit/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        $.notify("Audio Book Updated successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        $("#edit").modal("hide");
        location.reload();
      });
  } catch (err) {
    const error = JSON.parse(err.message);
    if (error)
      return $.notify("Please Enter valid mode and make", {
        className: "error",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
    $("#add").modal("hide");
  }
}
async function confirmDeleteAudioBook() {
  let _id = document.getElementById("_idDelete").value;
  await fetch(`${CONSTANT.API}books/audio/delete/${_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => {
      $.notify("Audio Deleted successfully", {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
      $("#delete").modal("hide");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
      $("#delete").modal("hide");
    });
}
async function deleteEbook() {
  let _id = document.getElementById("_idDelete").value;
  await fetch(`${CONSTANT.API}ebook/delete/${_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      $.notify("Ebook Deleted successfully", {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
      $("#delete").modal("hide");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
      $("#delete").modal("hide");
    });
}
async function confirmDeleteMake() {
  let _id = document.getElementById("_idDelete").value;
  await fetch(`${CONSTANT.API}car/make/delete/${_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => {
      $.notify("Make Deleted successfully", {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
      $("#delete").modal("hide");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
      $("#delete").modal("hide");
    });
}
async function addUser() {
  let firstName = document.getElementById("add_firstName").value;
  let lastName = document.getElementById("add_lastName").value;
  let email = document.getElementById("add_email").value;
  if (!validateEmail(email)) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid email", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (firstName.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid first name", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (lastName.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid last name", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (firstName.length === 0 || lastName.length === 0 || email.length === 0) {
    return $.notify("Please enter valid input", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  const user = {
    email: email,
    password: "12345678",
    firstName: firstName,
    lastName: lastName,
  };
  try {
    await fetch(`${CONSTANT.API}auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        $.notify("User Added successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        $("#add").modal("hide");
        location.reload();
      });
  } catch (err) {
    $.notify(err, {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
    $("#add").modal("hide");
  }
}
async function createEbook() {
  let title = document.getElementById("add_title").value;
  let shortNote = document.getElementById("add_shortNote").value;
  let author = document.getElementById("add_author").value;
  let synopsis = document.getElementById("add_synopsis").value;
  let chapter = $("input[name^='chapter\\[\\]']")
    .map(function () {
      return $(this).val();
    })
    .get();

  // var array = $("input[data-id]")
  //   .map(function (filed) {
  //       console.log($(this).data("id"))
  //   })
  //   .get();
  // console.log(array)

  console.log($("form").serializeArray());
  let page = $("input[name='page[]']")
    .map(function () {
      return $(this).val();
    })
    .get();
  let chapterContent = $("textarea[name='chapterContent[]']")
    .map(function () {
      return $(this).val();
    })
    .get()
    .filter(String);
  let image = document.getElementById("image").files[0];
  const data = {
    title: title,
    shortNote,
    author,
    synopsis,
    chapter,
    image,
    page,
    chapterContent: chapterContent,
  };
  console.log(data);
  // let formData = new FormData();
  // formData.append("title", title);
  // formData.append("shortNote", shortNote);
  // formData.append("author", author);
  // formData.append("synopsis", synopsis);
  // formData.append("image", image);
  // chapter.map((data, index) => {
  //   if (data.length > 0) return formData.append(`chapter[${[index]}]`, data);
  // });
  // chapterContent.map((data, index) => {
  //   if (data.length > 0) {
  //     formData.append(
  //       `chapterList[${[index]}][pages][${[index]}][number]`,
  //       index
  //     );
  //     formData.append(
  //       `chapterList[${[index]}][pages][${[index]}][number]`,
  //       index
  //     );
  //     formData.append(
  //       `chapterList[${[index]}][pages][${[index]}][content]`,
  //       data
  //     );
  //   }
  // });
  // console.log(Object.fromEntries(formData));
  // // // console.log(make_id);
  // if (
  //   title.length === 0 ||
  //   shortNote.length === 0 ||
  //   author.length === 0 ||
  //   synopsis.length === 0 ||
  //   image.length === 0 ||
  //   chapter.length === 0
  // ) {
  //   // document.getElementById('loader').classList.remove('is-active');
  //   return $.notify("Please enter valid input and file ", {
  //     className: "error",
  //     clickToHide: true,
  //     autoHide: true,
  //     globalPosition: "top center",
  //   });
  // }

  // // if (make_id.length === 0) {
  // //   // document.getElementById('loader').classList.remove('is-active');
  // //   return $.notify('Please select make name', {
  // //     className: 'error',
  // //     clickToHide: true,
  // //     autoHide: true,
  // //     globalPosition: 'top center',
  // //   });
  // // }

  // // const newModel = {
  // //   name:name,
  // //   makeId:make_id
  // // };
  // try {
  //   console.log(formData);
  //   await fetch(`${CONSTANT.API}ebook/create`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: formData,
  //   })
  //     .then(async (res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw await res.text().then((text) => new Error(text));
  //       }
  //     })
  //     .then((res) => {
  //       $.notify("Ebook Added successfully", {
  //         className: "success",
  //         clickToHide: true,
  //         autoHide: true,
  //         globalPosition: "top center",
  //       });
  //       $("#add").modal("hide");
  //       location.reload();
  //     });
  // } catch (err) {
  //   const error = JSON.parse(err.message);
  //   if (error)
  //     return $.notify("Please Enter valid mode and make", {
  //       className: "error",
  //       clickToHide: true,
  //       autoHide: true,
  //       globalPosition: "top center",
  //     });
  //   $("#add").modal("hide");
  // }
}
async function createBanner() {
  let name = document.getElementById("add_name").value;
  let image = document.getElementById("image").files[0];
  const data = {
    name,
    image,
  };
  let formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  // console.log(make_id);
  if (name.length === 0 || image.length === 0) {
    // document.getElementById('loader').classList.remove('is-active');
    return $.notify("Please enter valid input and file ", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }

  // if (make_id.length === 0) {
  //   // document.getElementById('loader').classList.remove('is-active');
  //   return $.notify('Please select make name', {
  //     className: 'error',
  //     clickToHide: true,
  //     autoHide: true,
  //     globalPosition: 'top center',
  //   });
  // }

  // const newModel = {
  //   name:name,
  //   makeId:make_id
  // };
  try {
    console.log(formData);
    await fetch(`${CONSTANT.API}banner/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        $.notify("Banner Added successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        $("#add").modal("hide");
        location.reload();
      });
  } catch (err) {
    const error = JSON.parse(err.message);
    if (error)
      return $.notify("Please Enter valid mode and make", {
        className: "error",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
    $("#add").modal("hide");
  }
}
async function confirmDeleteBanner() {
  let _id = document.getElementById("_idDelete").value;
  await fetch(`${CONSTANT.API}banner/${_id}/delete`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => {
      $.notify("Audio Deleted successfully", {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
      $("#delete").modal("hide");
      location.reload();
    })
    .catch((err) => {
      console.log(err);
      $("#delete").modal("hide");
    });
}
async function createReview(id) {
  // let review = 5;
  let name = document.getElementById("input_name").value;
  let designation = document.getElementById("input_designation").value;
  // console.log(document.getElementById("reviewCount"))
  let description = document.getElementById("input_description").value;
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  if (name.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid Name", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (designation.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid Designation", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  // if (review.length === 0) {
  //   document.getElementById("loader").classList.remove("is-active");
  //   return $.notify("Please enter valid Review", {
  //     className: "error",
  //     clickToHide: true,
  //     autoHide: true,
  //     globalPosition: "top center",
  //   });
  // }
  if (description.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid Description", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  const body =  {
    ebookId: id,
    // reviews: review,
    description: description,
    name:name,
    designation:designation
  }
  await fetch(`${CONSTANT.API}ebook/review/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log(res)
      $.notify("Review Added successfully", {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
      location.reload();
    })
    .catch((err) => {
      console.log(err)
    });
}
async function createAudioBooks() {
  let title = document.getElementById("add_title").value;
  let shortNote = document.getElementById("add_shortNote").value;
  let author = document.getElementById("add_author").value;
  let category = document.getElementById("category").value;
  let trackName = $("input[name='trackName[]']")
    .map(function () {
      return $(this).val();
    })
    .get();
  let trackFiles = $("input[name='trackFile[]']")
    .map(function () {
      return this.files[0];
    })
    .get();
  let image = document.getElementById("image").files[0];
  const data = {
    title: title,
    shortNote,
    author,
    trackName,
    image,
    trackFiles,
    category,
  };
  console.log(data);
  let formData = new FormData();
  formData.append("title", title);
  formData.append("shortNote", shortNote);
  formData.append("author", author);
  formData.append("synopsis", category);
  formData.append("image", image);
  formData.append("category", category);
  trackFiles.map((data, index) => {
    if (data) return formData.append(`track[${[index]}]`, data);
  });
  trackName.map((data, index) => {
    if (data.length > 0)
      return formData.append(`track[${[index]}][track]`, data);
  });
  console.log(Object.fromEntries(formData));
  // // console.log(make_id);
  // if (
  //   title.length === 0 ||
  //   shortNote.length === 0 ||
  //   author.length === 0 ||
  //   synopsis.length === 0 ||
  //   image.length === 0 ||
  //   ebook.length === 0 ||
  //   chapter.length === 0
  // ) {
  //   // document.getElementById('loader').classList.remove('is-active');
  //   return $.notify("Please enter valid input and file ", {
  //     className: "error",
  //     clickToHide: true,
  //     autoHide: true,
  //     globalPosition: "top center",
  //   });
  // }

  try {
    await fetch(`${CONSTANT.API}books/audio/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        $.notify("Audio Book Added successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        // $("#add").modal("hide");
        // location.reload();
      });
  } catch (err) {
    const error = JSON.parse(err.message);
    if (error)
      return $.notify("Please Enter valid mode and make", {
        className: "error",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
    $("#add").modal("hide");
  }
}
async function addMakes() {
  let name = document.getElementById("add_firstName").value;

  if (name.length === 0) {
    // document.getElementById('loader').classList.remove('is-active');
    return $.notify("Please enter valid make name", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }

  const newModel = {
    name: name,
  };
  try {
    await fetch(`${CONSTANT.API}car/make`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newModel),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        $.notify("Make Added successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        $("#add").modal("hide");
        location.reload();
      });
  } catch (err) {
    $.notify(err, {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
    $("#add").modal("hide");
  }
}
function editEbook(id, title, shortNote, author, synopsis, chapter) {
  let select_id = document.getElementById("id");
  select_id.value = id;
  let select_title = document.getElementById("edit_title");
  select_title.value = title;
  let select_shortNote = document.getElementById("edit_shortNote");
  select_shortNote.value = shortNote;
  let select_author = document.getElementById("edit_author");
  select_author.value = author;
  let select_synopsis = document.getElementById("edit_synopsis");
  select_synopsis.value = synopsis;
  var wrapperEdit = $(".edit-chapter-list");
  // var chapterList = chapter.split(",");
  console.log(JSON.parse(chapter));
  JSON.parse(chapter).map((data, index) => {
    if (index === 0) {
      return $(wrapperEdit).append(` <div>                                  
      <input type="text" value="${data.pages[0].content}" placeholder="Chapter 1" class="full-width block min-width-30 w-full p-2 mt-2 border rounded border-gray-500" name="editchapter[]"/> <button class="edit_form_field btnCircle-edit btnBackgroundColor btnBackgroundColor">+</button>
     <div class="row p-2 pt-1">
     <div class="col-2 p-1">
         <input placeholder="Start page No" min="1"
             class=" block min-width-30 w-full p-2 border rounded border-gray-500"
             style="width: 80px;" type="number" id="update_from">
     </div>
     <div class="col-2 p-1">
         <input placeholder="End page No" min="1"
             class=" block min-width-30 w-full p-2 border rounded border-gray-500"
             style="width: 80px;" type="number" id="update_to">
     </div>
     <div class="col-2 ml-2">
         <input class="btn btn-primary" type="button" value="Generate pages"
             onclick="updatedChapterList();">
     </div>
 </div>



 <div id="edit_field_div">

 </div>
 </div>`);
    }
    $(wrapperEdit).append(
      `<div><input type="text" value="${data}" placeholder="Chapter ${index}"  class="full-width block min-width-30 w-full p-2 mt-2 border rounded border-gray-500" name="editchapter[]"/> <button class="delete btnCircle-delete btnBackgroundColor btnBackgroundColor-delete">-</button>
      <div class="row p-2 pt-1">
      <div class="col-2 p-1">
          <input placeholder="Start page No" min="1"
              class=" block min-width-30 w-full p-2 border rounded border-gray-500"
              style="width: 80px;" type="number" id="from">
      </div>
      <div class="col-2 p-1">
          <input placeholder="End page No" min="1"
              class=" block min-width-30 w-full p-2 border rounded border-gray-500"
              style="width: 80px;" type="number" id="to">
      </div>
      <div class="col-2 ml-2">
          <input class="btn btn-primary" type="button" value="Generate pages"
              onclick="updatedChapterList();">
      </div>
  </div>



  <div id="edit_field_div">

  </div>
      </div>`
    );
  });
  var wrapperEdit = $(".edit-chapter-list");
  var edit_button = $(".edit_form_field");

  var y = chapterList.length;
  var max_fields = 10;
  $(edit_button).click(function (e) {
    e.preventDefault();
    if (y < max_fields) {
      y++;
      $(wrapperEdit)
        .append(`<div><input type="text" style="width: 300px;"  placeholder="Chapter ${y}"  class="block min-width-30 w-full p-2 mt-2 border rounded border-gray-500" name="editchapter[]"/> <button class="delete btnCircle-delete btnBackgroundColor btnBackgroundColor-delete">-</button>        <label class="mt-4">Enter chapter stant and end page number</label>
          <div class="row p-2 pt-1">
              <div class="col-2 p-1">
                  <input placeholder="Start page No" min="1"
                      class=" block min-width-30 w-full p-2 border rounded border-gray-500"
                      style="width: 80px;" type="number" id="newUpdate_from${y}">
              </div>
              <div class="col-2 p-1">
                  <input placeholder="End page No" min="1"
                      class=" block min-width-30 w-full p-2 border rounded border-gray-500"
                      style="width: 80px;" type="number" id="newUpdate_to${y}">
              </div>
              <div class="col-2 ml-2">
                  <input class="btn btn-primary" type="button" value="Generate pages"
                      onclick="updatedChapterListAddNew('edit_field_div${y}','${y}');">
              </div>
          </div>
          <div id="edit_field_div${y}">

          </div></div>`); //add input box
    } else {
      alert("You Reached the limits");
    }
  });

  $(wrapperEdit).on("click", ".delete", function (e) {
    e.preventDefault();
    $(this).parent("div").remove();
    y--;
  });
}
async function updateEbook() {
  let id = document.getElementById("id").value;
  let title = document.getElementById("edit_title").value;
  let shortNote = document.getElementById("edit_shortNote").value;
  let author = document.getElementById("edit_author").value;
  let synopsis = document.getElementById("edit_synopsis").value;
  let chapter = $("input[name='editchapter[]']")
    .map(function () {
      return $(this).val();
    })
    .get();

  // let ebook = document.getElementById('edit_ebook').files[0];
  // let image = document.getElementById('edit_image').files[0];
  if (
    title.length === 0 ||
    shortNote.length === 0 ||
    author.length === 0 ||
    synopsis.length === 0
  ) {
    // document.getElementById('loader').classList.remove('is-active');
    return $.notify("Please enter valid input and file ", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }

  const data = {
    title: title,
    shortNote,
    author,
    synopsis,
  };
  let formData = new FormData();
  formData.append("title", title);
  formData.append("shortNote", shortNote);
  formData.append("author", author);
  formData.append("synopsis", synopsis);

  // if (firstName.length === 0) {
  //   return $.notify("Please enter valid Model name", {
  //     className: "error",
  //     clickToHide: true,
  //     autoHide: true,
  //     globalPosition: "top center",
  //   });
  // }
  await fetch(`${CONSTANT.API}ebook/edit/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((res) => {
      $("#edit").modal("hide");
      setTimeout(() => {
        $.notify("Ebook updated successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        location.reload();
      }, 4000);
    })
    .catch((err) => {
      console.log(err);
    });
}
async function updateMakes() {
  let firstName = document.getElementById("firstName").value;
  let _id = document.getElementById("_id").value;
  const updateModel = {
    name: firstName,
  };
  if (firstName.length === 0) {
    return $.notify("Please enter valid Model name", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  await fetch(`${CONSTANT.API}car/make/edit/${_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updateModel),
  })
    .then((res) => {
      $("#edit").modal("hide");
      setTimeout(() => {
        $.notify("Model name updated successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        location.reload();
      }, 4000);
    })
    .catch((err) => {
      console.log(err);
    });
}
function getMake(slectedMake) {
  window.location.href = `make-model?makeId=${slectedMake.value}`;
}
async function signUp() {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let dateOfBirth = document.getElementById("dateOfBirth").value;
  if (!validateEmail(email)) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid email", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (firstName.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid first name", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (lastName.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid last name", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (password.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid password", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (password !== confirmPassword) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Password doesn't match", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  const signupData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    dateOfBirth: dateOfBirth,
  };
  try {
    await fetch(`${CONSTANT.API}auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        document.getElementById("loader").classList.remove("is-active");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.href = "/user/dashboard";
      })
      .catch(async (err) => {
        document.getElementById("loader").classList.remove("is-active");
        const error = JSON.parse(err.message);
        document.getElementById("loader").classList.remove("is-active");
        if (error)
          return $.notify(error.error, {
            className: "error",
            clickToHide: true,
            autoHide: true,
            globalPosition: "top center",
          });
        console.log(err);
      });
  } catch (err) {
    console.log;
    $.notify(err, {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
    $("#add").modal("hide");
  }
}
let role = "";
async function login() {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  !role ? (role = "cops") : role;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (!validateEmail(email)) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid email", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (password.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid password", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  await fetch(`${CONSTANT.API}auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        throw res;
      }
      document.getElementById("loader").classList.remove("is-active");
      return res.json();
    })
    .then((res) => {
      if (role === res.user.role) {
        if (res.user.role === "user") {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          window.location.href = "/user/dashboard";
        }
        if (res.user.role === "cops") {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          window.location.href = "/cops/dashboard";
        }
      } else {
        document.getElementById("loader").classList.remove("is-active");
        return $.notify(`No user found in ${role}`, {
          className: "error",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
      }
      // console.log(res);
      // window.location.href='/admin/dashboard';
    })
    .catch((err) => {
      document.getElementById("loader").classList.remove("is-active");
      err.json().then((res) => {
        if (res.message)
          return $.notify(res.message, {
            className: "error",
            clickToHide: true,
            autoHide: true,
            globalPosition: "top center",
          });
      });
      console.log(err);
    });
}
async function saveModel() {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  const make = document.getElementById("make").value;
  let model = document.getElementById("model").value;
  let color = document.getElementById("color").value;
  if (model.trim().length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid model", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (make.trim().length === 0) {
    console.log("make->>>>>>>>>>>>>", make);
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid make", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  if (color.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid color", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  const carDetails = {
    modelId: model.trim(),
    makeId: make.trim(),
    color: color,
  };
  console.log(carDetails);
  const user = JSON.parse(localStorage.getItem("user"));
  let _id = user._id;
  await fetch(`${CONSTANT.API}/users/document/details/${_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      carDetails: carDetails,
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        throw res;
      }
      document.getElementById("loader").classList.remove("is-active");
      return res.json();
    })
    .then((res) => {
      setTimeout(() => {
        $.notify("Model Added successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        location.reload();
      }, 4000);
    })
    .catch((err) => {
      document.getElementById("loader").classList.remove("is-active");
      err.json().then((res) => {
        if (res.message)
          return $.notify(res.message, {
            className: "error",
            clickToHide: true,
            autoHide: true,
            globalPosition: "top center",
          });
      });
      console.log(err);
    });
}

async function editProfile() {
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let dateOfBirth = document.getElementById("dateOfBirth").value;
  const updateUser = {
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
  };
  const user = JSON.parse(localStorage.getItem("user"));
  let _id = user._id;
  if (firstName.length === 0 || lastName.length === 0) {
    return $.notify("Please enter valid input", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  await fetch(`${CONSTANT.API}users/${_id}/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => {
      $("#edit").modal("hide");
      setTimeout(() => {
        $.notify("User updated successfully", {
          className: "success",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
        location.reload();
      }, 4000);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function forgetPassword() {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  let email = document.getElementById("email").value;
  if (!validateEmail(email)) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid email", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  await fetch(`${CONSTANT.API}auth/forget`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw await res.text().then((text) => new Error(text));
      }
    })
    .then(async (res) => {
      document.getElementById("loader").classList.remove("is-active");
      $.notify(`Password successfully send to ${email}`, {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
      await delay(5000);
      window.location.href = "/signin";
    })
    .catch((err) => {
      document.getElementById("loader").classList.remove("is-active");
      const error = JSON.parse(err.message);
      if (error)
        return $.notify(error.error, {
          className: "error",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
      console.log(err);
    });
}

async function saveSocial() {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  const socialSecurity = document.getElementById("socialSecurity").value;
  if (socialSecurity.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid input", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  const user = JSON.parse(localStorage.getItem("user"));
  let _id = user._id;
  await fetch(`${CONSTANT.API}/users/document/details/${_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      socilaSecurity: socialSecurity,
    }),
  })
    .then(async (res) => {
      document.getElementById("loader").classList.remove("is-active");
      $.notify("Social Security Number updated successfully ", {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
    })
    .catch((err) => {
      err.json().then((res) => {
        if (res.message) alert(res.message);
      });
      console.log(err);
    });
}

async function licenceSave() {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  const licensePlateNumber =
    document.getElementById("licensePlateNumber").value;
  const state = document.getElementById("state").value;
  const user = JSON.parse(localStorage.getItem("user"));
  let states = null;
  if (state) {
    states = user.state.map((el) => {
      if (el.abbreviation.trim() === state.trim()) {
        el.selected = "selected";
      } else {
        el.selected = "";
      }
      return el;
    });
  }
  if (licensePlateNumber.length === 0 || state.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Please enter valid input", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }

  let _id = user._id;
  await fetch(`${CONSTANT.API}/users/document/details/${_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      licensePlateNumber: licensePlateNumber,
      state: states,
    }),
  })
    .then(async (res) => {
      document.getElementById("loader").classList.remove("is-active");
      $.notify("License Plate Number Number updated successfully ", {
        className: "success",
        clickToHide: true,
        autoHide: true,
        globalPosition: "top center",
      });
    })
    .catch((err) => {
      err.json().then((res) => {
        if (res.message) alert(res.message);
      });
      console.log(err);
    });
}

async function googleLogin(token) {
  if (token.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Something went wrong", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  await fetch(`${CONSTANT.API}auth/social/login/google`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((res) => {
      if (res.status === 401) {
        throw res;
      }
      document.getElementById("loader").classList.remove("is-active");
      return res.json();
    })
    .then((res) => {
      console.log(res, res.user.role, role);
      if (res.user) {
        if (res.user.role === "user") {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          window.location.href = "/user/dashboard";
        }
        if (res.user.role === "cops") {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          window.location.href = "/cops/dashboard";
        }
      } else {
        document.getElementById("loader").classList.remove("is-active");
        return $.notify(`No user found in ${role}`, {
          className: "error",
          clickToHide: true,
          autoHide: true,
          globalPosition: "top center",
        });
      }
      // console.log(res);
      // window.location.href='/admin/dashboard';
    })
    .catch((err) => {
      document.getElementById("loader").classList.remove("is-active");
      err.json().then((res) => {
        if (res.message)
          return $.notify(res.message, {
            className: "error",
            clickToHide: true,
            autoHide: true,
            globalPosition: "top center",
          });
      });
      console.log(err);
    });
}

async function verifyAppleTokenAndSignup() {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  let token = document.getElementById("token").value.trim();
  if (token.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Something went wrong", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  try {
    await fetch(`${CONSTANT.API}auth/social/signup/apple`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        document.getElementById("loader").classList.remove("is-active");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.href = "/user/dashboard";
      })
      .catch(async (err) => {
        document.getElementById("loader").classList.remove("is-active");
        console.log(err);
        const error = JSON.parse(err.message);
        document.getElementById("loader").classList.remove("is-active");
        if (error) {
          $.notify(error.error, {
            className: "error",
            clickToHide: true,
            autoHide: true,
            globalPosition: "top center",
          });
        }
        await delay(2000);
        window.location.href = "/signup";
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    $.notify(err, {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
    await delay(2000);
    window.location.href = "/signup";
    $("#add").modal("hide");
  }
  // document.getElementById('loader').classList.remove('is-active');
}

async function verifyAppleTokenAndLogin() {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  console.log(loader);
  let token = document.getElementById("token").value.trim();
  if (token.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Something went wrong", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  try {
    await fetch(`${CONSTANT.API}auth/social/login/apple`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        document.getElementById("loader").classList.remove("is-active");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.href = "/user/dashboard";
      })
      .catch(async (err) => {
        document.getElementById("loader").classList.remove("is-active");
        console.log(err);
        const error = JSON.parse(err.message);
        document.getElementById("loader").classList.remove("is-active");
        if (error) {
          $.notify(error.error, {
            className: "error",
            clickToHide: true,
            autoHide: true,
            globalPosition: "top center",
          });
        }
        await delay(2000);
        // window.location.href = '/signup';
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    $.notify(err, {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
    await delay(2000);
    // window.location.href = '/signup';
    $("#add").modal("hide");
  }
}

async function googleSignUp(token) {
  let loader = document.getElementById("loader");
  loader.classList.add("is-active");
  if (token.length === 0) {
    document.getElementById("loader").classList.remove("is-active");
    return $.notify("Something went wrong", {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
  }
  try {
    await fetch(`${CONSTANT.API}auth/social/signup/google`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw await res.text().then((text) => new Error(text));
        }
      })
      .then((res) => {
        document.getElementById("loader").classList.remove("is-active");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.href = "/user/dashboard";
      })
      .catch(async (err) => {
        document.getElementById("loader").classList.remove("is-active");
        const error = JSON.parse(err.message);
        document.getElementById("loader").classList.remove("is-active");
        if (error)
          return $.notify(error.error, {
            className: "error",
            clickToHide: true,
            autoHide: true,
            globalPosition: "top center",
          });
        console.log(err);
      });
  } catch (err) {
    console.log;
    $.notify(err, {
      className: "error",
      clickToHide: true,
      autoHide: true,
      globalPosition: "top center",
    });
    $("#add").modal("hide");
  }
}
